"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { SingleImageDropzone } from "./SingleImageDropzone";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

type ImageUploaderProps = {
  onImageUploadSuccess: (imageURL: string) => void;
};

const ImageUploader = ({ onImageUploadSuccess }: ImageUploaderProps) => {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file?: File) => {
    setFile(file);
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          setIsUploading(true);
          setProgress(progress);
        },
      });
      setIsUploading(false);
      setProgress(0);
      onImageUploadSuccess(res.url);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dodaj zdjęcie</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {isUploading ? (
          <div className="self-center">Trwa przesyłanie...</div>
        ) : (
          <div className="self-center">
            Zalecane proporcje to 16:9, inaczej brzegi zdjęcia będą ucięte.
          </div>
        )}
        <Progress value={progress} />
        <SingleImageDropzone
          className="aspect-video"
          value={file}
          onChange={handleUpload}
        />
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
