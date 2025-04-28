export const filterSiteListData = ({
  form,
  originalData,
}: {
  form: any;
  originalData: any[];
}) => {
  const values = form.getValues();
  console.log("Filtering with Site:", values.site);
  console.log("Filtering with HousingType:", values.housingType);

  return originalData.filter((item) => {
    const siteMatch = values.site
      ? item.Site && item.Site.toLowerCase().includes(values.site.toLowerCase())
      : true;

    const housingTypeMatch = values.housingType
      ? item.HousingType && item.HousingType.toLowerCase().includes(values.housingType.toLowerCase())
      : true;

    return siteMatch && housingTypeMatch;
  });
};
