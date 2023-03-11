export function copyData(formData, rowData) {
  const copyKeys = Object.keys(formData);
  copyKeys.forEach((key) => {
    formData[key] = rowData[key];
  });
}
