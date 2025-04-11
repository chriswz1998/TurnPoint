import { flowThroughDataProps } from "@/reports/flow-through/_components/columns.tsx";

interface DateRange {
  from?: Date;
  to?: Date;
}

export function filterData(
  data: flowThroughDataProps[],
  dateRange: DateRange,
): flowThroughDataProps[] | undefined {
  const { from, to } = dateRange;

  // 没有任何过滤条件，返回全部数据
  if (!from && !to) {
    return data;
  }

  if (from && !to) {
    return data.filter((item) => {
      const startDate = new Date(item.startDate);
      return startDate >= from;
    });
  }

  if (!from && to) {
    return data.filter((item) => {
      const exitDate = item.exitDate ? new Date(item.exitDate) : null;
      return exitDate ? exitDate <= to : false;
    });
  }

  if (from && to) {
    return data.filter((item) => {
      const startDate = new Date(item.startDate);
      const exitDate = item.exitDate ? new Date(item.exitDate) : null;
      return startDate >= from && exitDate !== null && exitDate <= to;
    });
  }
}
