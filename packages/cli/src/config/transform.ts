import type { API, FileInfo, Options } from 'jscodeshift';

export default function transform(
  fileInfo: FileInfo,
  api: API,
  options: Options,
) {
  const j = api.jscodeshift;
  const { updatedConfig } = options;
  // console.log('OSTRA', updatedConfig);

  // return fileInfo.source;
  const root = j(fileInfo.source);

  // const a = root.find(j.Program).get('body', 0);
  // const a = root.find(j.Program).get('body', 0);
  // console.log(a.value.declaration.properties[0]);

  root.find(j.Property).forEach((path) => {
    if (
      updatedConfig.outDir &&
      path.getValueProperty('key').name === 'outDir'
    ) {
      // path.setValueProperty('value', updatedConfig.outDir);

      path.value.value.value = updatedConfig.outDir;
    }
  });

  // root.find(j.Identifier).forEach((path) => {
  //   if (path.value.name === 'outDir') {
  //     console.log(path.value);
  //   }
  // });

  // a.find(j).forEach((path) => {
  //   console.log(path.value);
  // });

  return root.toSource();
}
