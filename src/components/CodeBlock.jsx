import { CodeBlock as ReactCodeBlocks, dracula } from 'react-code-blocks';

const CodeBlock = ({ code }) => {
    return (
        <div key={2} style={{ fontFamily: 'Fira Code' }}>
            <ReactCodeBlocks text={code} language='javascript' theme={dracula} />
        </div>
    );
};

export default CodeBlock;
