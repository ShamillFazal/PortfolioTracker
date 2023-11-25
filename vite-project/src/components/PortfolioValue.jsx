import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Widget } from "@web3uikit/core"

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
      <div className="container mx-auto flex justify-end">
      <div className="w-96">
      <Widget info={`$${totalValue}`} title="Net Worth" />
      </div>
        {/* <div className="flex-initial border-solid border-2 border-gray rounded-md max-w-sm">
          <p className="text-xl">Net Worth</p>
          <p>
            <p className="text-3xl">${totalValue}</p>
          </p>
        </div> */}
      </div>
    </>
  );
}

PortfolioValue.propTypes = {
  nativeValue: PropTypes.number.isRequired,
  tokens: PropTypes.array.isRequired,
};

export default PortfolioValue;
