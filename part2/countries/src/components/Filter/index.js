const Filter = ({ onChange }) => {
  return (
    <div>
      find countries <input onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default Filter;
