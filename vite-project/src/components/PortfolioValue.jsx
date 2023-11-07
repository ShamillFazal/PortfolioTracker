import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function PortfolioValue({ nativeValue, tokens }) {
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    let val = 0;

    for (let i = 0; i < tokens.length; i++) {
      val = val + Number(tokens[i].value);
    }

    val = val + Number(nativeValue);

    setTotalValue(val.toFixed(2));
  }, [nativeValue, tokens]);

  return (
    <>
      <h1>Portfolio Total Value</h1>
      <p>
        <span>Total Balance: ${totalValue}</span>
      </p>
    </>
  );
}

PortfolioValue.propTypes = {
  nativeValue: PropTypes.number.isRequired,
  tokens: PropTypes.array.isRequired,
};

export default PortfolioValue;
