import { Dispensing } from "~/models";

function calcPeriod(dispensings: Dispensing[]): number {
  dispensings.sort((a, b) => {
    const date1 = new Date(a.localDate);
    const date2 = new Date(b.localDate);
    if (date1 < date2) return -1;
    else if (date1 > date2) return 1;
    return 0;
  });
  const dates = dispensings.map(disp => new Date(disp.localDate));
  const date1 = dates.at(0);
  const date2 = dates.at(-1);
  if (!date1 || !date2) return -1;
  const diff = date2.getTime() - date1.getTime();
  const days = Math.floor(diff / (24 * 60 * 60 * 1000)) + 1;
  return days;
}

export { calcPeriod };