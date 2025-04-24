export default function FileItem({ name }: { name: string }) {
  return (
    <div className="h-48 border border-gray-300 rounded-xl flex flex-col w-[45%] xsm:w-[30%] lg:w-[20%] max-w-48">
      <p className="w-full h-12 border-b px-2 border-gray-200 pt-3 text-center overflow-hidden text-ellipsis whitespace-nowrap font-normal">
        {name}
      </p>
    </div>
  );
}
