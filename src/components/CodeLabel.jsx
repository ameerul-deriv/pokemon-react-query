const CodeLabel = ({ children }) => {
    return (
        <code className='relative rounded bg-red-100 px-[0.3rem] py-[0.2rem] font-mono font-semibold text-red-900'>
            {children}
        </code>
    );
};

export default CodeLabel;
