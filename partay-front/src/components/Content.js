import '../css/components/Content.css';

function Content({ className, children }) {

  return (
    <div className='Content'>
      <div className={'Page ' + className}>
        {children}
      </div>
    </div>
  );
}

export default Content;