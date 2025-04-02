import GradientBackgroundContainer from '@/components/GradientBackgroundContainer'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { columns } from "./_components/columns";
import { DataTable } from '@/reports/_components/data-table.tsx'
import { DataTablePagination } from '@/reports/_components/table-pagination.tsx'
import useHttp from '@/lib/use-http.ts'

const reports = [
  'Intake Reporting',
  'Flow-Through',
  'Loss of Service',
  'Rent Supplement Request',
  'Goals and Progress',
  'Safety Plan',
  'Overdose Safety Plan',
  'Incident Report',
  'Individuals',
  'Shelter Diversion Follow-Up Log',
  'Site List'
]

export interface RequestDataProps {
  data: {
    id : string
    filename:  string
    filetypeId: string
    uploadtime: Date
  }
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}



export default function Reports() {
  const [search, setSearch] = useState('')

  const {fetchData, data:res} = useHttp<any, RequestDataProps>()

  const filteredReports = reports.filter((report) =>
    report.toLowerCase().includes(search.toLowerCase())
  )

  const navigate = useNavigate()

  const handleReportClick = (report: string) => {
    navigate(`/report/${report.replace(/\s+/g, '-').toLowerCase()}`)
  }

  const getData = async () => {

  }

  return (
    <GradientBackgroundContainer className="bg-white w-full h-full py-24 sm:py-32">
      <DataTable columns={columns} data={res} />
      <DataTablePagination
        page={res.pagination.currentPage}
        pageSize={res.pagination.pageSize}
        total={res.pagination.total}
        totalPages={res.pagination.totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setCurrentPage(1) // 通常更换 pageSize 会重置回第一页
        }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Reports
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Select a report to view details.
          </p>
          <Input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-6 w-full max-w-md mx-auto"
          />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredReports.map((report) => (
            <Card
              key={report}
              className="cursor-pointer hover:shadow-lg"
              onClick={() => handleReportClick(report)}
            >
              <CardContent className="p-6 text-center">
                <CardTitle>{report}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </GradientBackgroundContainer>
  )
}
