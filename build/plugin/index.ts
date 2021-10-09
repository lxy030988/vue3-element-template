import type { Plugin as rollupPlugin } from 'rollup'

import visualizer from 'rollup-plugin-visualizer'
import gzipPlugin from './gzip/index'

import { isSiteMode, isReportMode, isBuildGzip } from '../utils'

// gen rollup plugins
export function createRollupPlugin() {
  const rollupPlugins: rollupPlugin[] = []

  if (isReportMode()) {
    // rollup-plugin-visualizer
    rollupPlugins.push(visualizer({ filename: './build/.cache/stats.html', open: true }) as Plugin)
  }
  if (isBuildGzip() || isSiteMode()) {
    // rollup-plugin-gizp
    rollupPlugins.push(gzipPlugin())
  }

  return rollupPlugins
}
