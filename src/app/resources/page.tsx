import Link from "next/link";
import { documents, categoryLabels } from "@/data/documents";

export default function ResourcesPage() {
  const categories = ["daily", "safety", "quality", "improvement"] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Team Leader Documents
        </h1>
        <p className="text-sst-gray max-w-xl mx-auto">
          Printable forms, checklists, and logs for daily use on the floor.
          Click any document to view and print.
        </p>
      </div>

      {categories.map((cat) => {
        const catDocs = documents.filter((d) => d.category === cat);
        if (catDocs.length === 0) return null;
        return (
          <div key={cat} className="mb-10">
            <h2 className="text-lg font-bold mb-4 text-sst-charcoal border-b border-sst-border/30 pb-2">
              {categoryLabels[cat]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catDocs.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/resources/${doc.id}`}
                  className="bg-white rounded-xl border border-sst-border/50 p-5 hover:shadow-md hover:border-sst-orange/30 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{doc.icon}</span>
                    <div>
                      <h3 className="font-bold text-sm group-hover:text-sst-orange transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-sst-gray mt-1">{doc.description}</p>
                      <span className="inline-flex items-center gap-1 text-xs text-sst-orange font-medium mt-2">
                        View & Print
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
