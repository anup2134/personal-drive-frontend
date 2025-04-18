import type { ReactElement } from "react";
import FileItem from "./FileItem";

export const ActiveTab = ({
  tab,
}: {
  tab: { name: string; icon: ReactElement };
}) => {
  return (
    <section className="px-4 flex flex-col geist-500">
      <header className="flex items-center mb-4">
        {tab.icon}
        {tab.name}
      </header>
      <main className="flex flex-wrap gap-4">
        <FileItem />
        <FileItem />
        <FileItem />
        <FileItem />
        <FileItem />
        <FileItem />
        <FileItem />
        <FileItem />
        <FileItem />
        <FileItem />
        <FileItem />
        <FileItem />
      </main>
    </section>
  );
};
