CREATE POLICY "Deny all access to cat-photos bucket objects"
ON storage.objects
FOR ALL
TO anon, authenticated
USING (bucket_id <> 'cat-photos')
WITH CHECK (bucket_id <> 'cat-photos');