export const Loader = () => {
  let loader = "h-2.5 w-2.5 bg-teal-500 rounded-full";
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`${loader} mr-1 animate-bounce`}></div>
      <div className={`${loader} mr-1 animate-bounce200`}></div>
      <div className={`${loader} animate-bounce400`}></div>
    </div>
  );
};
