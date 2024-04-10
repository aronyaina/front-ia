import { UploadCloudIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function ImageUploader() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Images</CardTitle>
        <CardDescription>Drag and drop your images or click the button below to select files.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-6">
        <UploadCloudIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />
        <Button variant="outline">Select Files</Button>
      </CardContent>
    </Card>
  )
}
