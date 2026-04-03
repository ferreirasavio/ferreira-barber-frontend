type ButtonProps = {
  onClick: () => void;
  children?: React.ReactElement | string | number;
  disabled?: boolean;
};

export default function Button(props: ButtonProps) {
  return (
    <button {...props} className="bg-slate-400 p-2 rounded-md text-white">
      {props.children}
    </button>
  );
}
