import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import Journal from "./pages/Journal";
import JournalPost from "./pages/JournalPost";
import JournalCompose from "./pages/JournalCompose";
import DadsStory from "./pages/DadsStory";
import Map from "./pages/Map";
import StateDetail from "./pages/StateDetail";
import About from "./pages/About";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import OAuthConsent from "./pages/OAuthConsent";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/map" element={<Map />} />
          <Route path="/state/:code" element={<StateDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/new" element={<JournalCompose />} />
          <Route path="/journal/:id" element={<JournalPost />} />
          <Route path="/dads-story" element={<DadsStory />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
