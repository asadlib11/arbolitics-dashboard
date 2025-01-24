interface CompanyInfo {
  name: string;
  isActive: boolean;
}

interface CompanyInfoPanelProps {
  company: CompanyInfo;
}

export function CompanyInfoPanel({ company }: CompanyInfoPanelProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Company Information
      </h2>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Company Name
              </dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                {company.name}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Company Status
              </dt>
              <dd className="mt-1">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    company.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {company.isActive ? "Active" : "Inactive"}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
