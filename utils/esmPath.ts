import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);

// 获取当前模块的目录路径
const __dirname = dirname(__filename);

// 导出项目根目录路径（向上一级目录）
export const _dirname = dirname(__dirname);

// 也可以导出这些工具函数
export { __filename, __dirname };