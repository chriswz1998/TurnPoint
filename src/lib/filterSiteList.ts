/**
 * Filters the site list data based on the form values for 'site' and 'housingType'.
 * 
 * This function filters the `originalData` array based on the values provided in the form.
 * It checks the following criteria:
 * - `site`: If a `site` value is provided in the form, it filters the data to only include items where the `Site` field matches the input value (case-insensitive).
 * - `housingType`: If a `housingType` value is provided in the form, it filters the data to only include items where the `HousingType` field matches the input value (case-insensitive).
 * 
 * If no value is provided for either `site` or `housingType`, those fields are not used for filtering.
 * 
 * Parameters:
 * - `form`: The form object, typically from `react-hook-form`, containing the filter values for `site` and `housingType`.
 * - `originalData`: An array of data to be filtered based on the provided form values.
 * 
 * Returns:
 * - An array of filtered data that matches the specified criteria.
 */

export const filterSiteListData = ({
  form,
  originalData,
}: {
  form: any;
  originalData: any[];
}) => {
  const values = form.getValues();

  // Log the filtering criteria to the console (for debugging purposes)
  console.log("Filtering with Site:", values.site);
  console.log("Filtering with HousingType:", values.housingType);

  // Filter the original data based on the site and housing type
  return originalData.filter((item) => {
    // Check if the 'Site' field matches the form value (case-insensitive)
    const siteMatch = values.site
      ? item.Site && item.Site.toLowerCase().includes(values.site.toLowerCase())
      : true;

      // Check if the 'HousingType' field matches the form value (case-insensitive)
    const housingTypeMatch = values.housingType
      ? item.HousingType && item.HousingType.toLowerCase().includes(values.housingType.toLowerCase())
      : true;

      // Return true if both site and housing type match the criteria
    return siteMatch && housingTypeMatch;
  });
};
