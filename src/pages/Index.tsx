import { DocumentViewer } from '@/components/DocumentViewer';
import { sampleDocuments } from '@/data/sampleDocuments';

const Index = () => {
  return (
    <div className="h-screen">
      <DocumentViewer documents={sampleDocuments} />
    </div>
  );
};

export default Index;
