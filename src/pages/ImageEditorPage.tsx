import ImageEditor from "@/components/ImageEditor";

const ImageEditorPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Image Editor</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ImageEditor />
      </div>
    </div>
  );
};

export default ImageEditorPage; 