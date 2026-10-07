import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Sparkles, Upload, Send, Lock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const PASSCODE_KEY = 'cat_blog_passcode';

function fileToBase64(file: File): Promise<{ b64: string; mime: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const [meta, b64] = result.split(',');
      const mime = meta.match(/data:(.*?);base64/)?.[1] || file.type;
      resolve({ b64, mime });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const JournalCompose = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [passcode, setPasscode] = useState(() => sessionStorage.getItem(PASSCODE_KEY) || '');
  const [unlocked, setUnlocked] = useState(() => !!sessionStorage.getItem(PASSCODE_KEY));

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [postDate, setPostDate] = useState(new Date().toISOString().slice(0, 10));
  const [assignment, setAssignment] = useState('');
  const [tone, setTone] = useState('playful');
  const [tagsRaw, setTagsRaw] = useState('');
  const [bodyMd, setBodyMd] = useState('');
  const [generating, setGenerating] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem(PASSCODE_KEY, passcode);
    setUnlocked(true);
  };

  const handlePhoto = (file: File | null) => {
    setPhoto(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    } else {
      setPhotoPreview('');
    }
  };

  const generate = async () => {
    if (!photo || !assignment.trim()) {
      toast({ title: 'Need a photo and an assignment', variant: 'destructive' });
      return;
    }
    setGenerating(true);
    try {
      const { b64, mime } = await fileToBase64(photo);
      const { data, error } = await supabase.functions.invoke('generate-cat-post', {
        body: { photoBase64: b64, mimeType: mime, assignment, tone, location },
        headers: { 'x-admin-passcode': passcode },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (data?.title && !title) setTitle(data.title);
      setBodyMd(data?.body_md ?? '');
      toast({ title: 'Draft ready — edit before publishing.' });
    } catch (e: any) {
      toast({ title: 'Generation failed', description: String(e?.message ?? e), variant: 'destructive' });
      if (String(e?.message ?? e).toLowerCase().includes('unauthorized')) {
        sessionStorage.removeItem(PASSCODE_KEY);
        setUnlocked(false);
      }
    } finally {
      setGenerating(false);
    }
  };

  const publish = async (asDraft: boolean) => {
    if (!photo || !title.trim() || !bodyMd.trim()) {
      toast({ title: 'Photo, title and body are required', variant: 'destructive' });
      return;
    }
    setPublishing(true);
    try {
      const { b64, mime } = await fileToBase64(photo);
      const tags = tagsRaw.split(',').map((t) => t.trim()).filter(Boolean);
      const { data, error } = await supabase.functions.invoke('publish-cat-post', {
        body: {
          title, location, postDate, assignment, tone, tags,
          photoBase64: b64, mimeType: mime, bodyMd, publish: !asDraft,
        },
        headers: { 'x-admin-passcode': passcode },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: asDraft ? 'Saved as draft' : 'Published!' });
      if (!asDraft && data?.post?.slug) {
        navigate(`/journal/${data.post.slug}`);
      } else {
        navigate('/journal');
      }
    } catch (e: any) {
      toast({ title: 'Publish failed', description: String(e?.message ?? e), variant: 'destructive' });
    } finally {
      setPublishing(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-md">
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Lock className="w-10 h-10 mx-auto mb-3 text-secondary" />
                  <h1 className="text-2xl font-serif font-bold">Compose Access</h1>
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter the admin passcode to write a new post.
                  </p>
                </div>
                <form onSubmit={handleUnlock} className="space-y-4">
                  <Input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Passcode"
                    autoFocus
                  />
                  <Button type="submit" className="w-full">Unlock</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/journal"><ArrowLeft size={18} className="mr-2" /> Back to Journal</Link>
          </Button>

          <h1 className="text-4xl font-serif font-bold mb-2">New Post</h1>
          <p className="text-muted-foreground mb-8">
            Upload a photo, give Stevie & Jewels an assignment, and let them write the draft.
          </p>

          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Photo */}
              <div>
                <Label className="mb-2 block">Photo</Label>
                <div className="flex items-start gap-4">
                  <label className="flex-1 cursor-pointer border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                    <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {photo ? photo.name : 'Click to choose a photo of Stevie or Jewels'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhoto(e.target.files?.[0] ?? null)}
                    />
                  </label>
                  {photoPreview && (
                    <img src={photoPreview} alt="preview" className="w-32 h-32 object-cover rounded-lg" />
                  )}
                </div>
              </div>

              {/* Assignment */}
              <div>
                <Label htmlFor="assignment" className="mb-2 block">Assignment</Label>
                <Textarea
                  id="assignment"
                  rows={3}
                  value={assignment}
                  onChange={(e) => setAssignment(e.target.value)}
                  placeholder="e.g. We hiked a trail in Acadia and Jewels got scared of a chipmunk."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location" className="mb-2 block">Location</Label>
                  <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Bar Harbor, Maine" />
                </div>
                <div>
                  <Label htmlFor="date" className="mb-2 block">Date</Label>
                  <Input id="date" type="date" value={postDate} onChange={(e) => setPostDate(e.target.value)} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="playful">Playful</SelectItem>
                      <SelectItem value="dramatic">Dramatic</SelectItem>
                      <SelectItem value="reflective">Reflective</SelectItem>
                      <SelectItem value="sassy">Sassy</SelectItem>
                      <SelectItem value="whimsical">Whimsical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tags" className="mb-2 block">Tags (comma-separated)</Label>
                  <Input id="tags" value={tagsRaw} onChange={(e) => setTagsRaw(e.target.value)} placeholder="Maine, hike, sunset" />
                </div>
              </div>

              <Button onClick={generate} disabled={generating} className="w-full">
                <Sparkles size={18} className="mr-2" />
                {generating ? 'Generating…' : 'Generate draft from photo'}
              </Button>

              {/* Title + Body editor */}
              <div>
                <Label htmlFor="title" className="mb-2 block">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (the AI will suggest one)" />
              </div>

              <div>
                <Label htmlFor="body" className="mb-2 block">Body (markdown)</Label>
                <Textarea
                  id="body"
                  rows={16}
                  value={bodyMd}
                  onChange={(e) => setBodyMd(e.target.value)}
                  placeholder="The generated draft will appear here. Edit freely before publishing."
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => publish(true)} disabled={publishing} className="flex-1">
                  Save as draft
                </Button>
                <Button onClick={() => publish(false)} disabled={publishing} className="flex-1">
                  <Send size={18} className="mr-2" />
                  {publishing ? 'Publishing…' : 'Publish'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JournalCompose;
