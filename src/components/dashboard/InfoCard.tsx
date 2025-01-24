import { ReactNode } from "react";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  bgColor?: string;
}

export function InfoCard({
  icon,
  title,
  value,
  bgColor = "bg-indigo-500",
}: InfoCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${bgColor} rounded-md p-3`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-sm font-semibold text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
