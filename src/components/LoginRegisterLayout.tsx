type LoginRegisterLayoutProps = {
  children: React.ReactElement[];
};

export default function LoginRegisterLayout({
  children,
}: LoginRegisterLayoutProps) {
  return (
    <div
      id="layout_container"
      className="mx-auto w-11/12 mt-3 flex flex-col items-center justify-center h-[97vh] max-w-lg xl:max-w-md 2xl:max-w-sm"
    >
      <div className="md:p-14 md:border-[1px] md:border-[#bdbdbd] md:rounded-3xl lg:p-11 2xl:p-9 w-full">
        {children}
      </div>
    </div>
  );
}
