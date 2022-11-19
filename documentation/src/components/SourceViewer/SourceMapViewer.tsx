import * as Tabs from "@radix-ui/react-tabs";

import { SourceViewer, Language } from "./SourceViewer";

export type SourceMap = Record<Language, string>;

export interface SourceMapViewerProps {
	sourceMap: SourceMap;
}

export const SourceMapViewer = ({ sourceMap }: SourceMapViewerProps) => {
	const sourceMapEntries = Object.entries(sourceMap);

	return (
		<Tabs.Root>
			<Tabs.List>
				{sourceMapEntries.map(([language]) => (
					<Tabs.Trigger value={language}>{language}</Tabs.Trigger>
				))}
			</Tabs.List>
			{sourceMapEntries.map(([language, source]) => (
				<Tabs.Content value={language}>
					<SourceViewer language={language as Language} source={source} />
				</Tabs.Content>
			))}
		</Tabs.Root>
	);
};
