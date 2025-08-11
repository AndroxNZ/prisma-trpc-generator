import path from 'path';

export default function getRelativePath(
  outputPath: string,
  filePath: string,
  isOutsideOutputPath?: boolean,
  schemaPath?: string,
  importExtension?: string,
) {
  const fromPath = path.join(outputPath, 'routers', 'helpers');
  let toPath = path.join(outputPath, filePath);

  if (isOutsideOutputPath && schemaPath) {
    const schemaPathSplit = schemaPath.split(path.sep);
    const schemaPathWithoutFileAndExtension = schemaPathSplit
      .slice(0, schemaPathSplit.length - 1)
      .join(path.posix.sep);
    toPath = path.join(schemaPathWithoutFileAndExtension, filePath);
  }

  let newPath = path
    .relative(fromPath, toPath)
    .split(path.sep)
    .join(path.posix.sep);

  // Add import extension if specified
  if (importExtension) {
    // Remove existing extension if present
    const withoutExt = newPath.replace(/\.[^/.]+$/, '');
    newPath = `${withoutExt}.${importExtension}`;
  }

  return newPath;
}
