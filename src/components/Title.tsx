type TitleProps = {
  title: string;
};

export default function Title({ title }: TitleProps) {
  return (
    <h1 className="text-3xl text-slate-800 font-bold text-center">{title}</h1>
  );
}
