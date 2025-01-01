import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
  borderColor: '#000',
};

const Spinner = ({ loading }) => {
  return <ClipLoader color="#000" loading={loading} cssOverride={override} />;
};

export default Spinner;
