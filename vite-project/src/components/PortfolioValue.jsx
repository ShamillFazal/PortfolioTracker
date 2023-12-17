import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Avatar } from "@web3uikit/core";

function PortfolioValue({ nativeValue, tokens, wallet }) {
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
      <div className="container mx-auto w-full lg:max-w-screen-lg xl:max-w-screen-xl flex justify-end">
        <div className="rounded-3xl w-96 flex items-center p-8">
          <div className="pr-6">
            <Avatar
              borderRadius={10}
              size={130}
              image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA6RJREFUeF7t3b1tVGEQRuFvY4f0QISQCCmBBiwyROwuHNCBY1LkBiiCgJyADhwQODaihgdpNNrjfHzvnvt+Z+b+7N3Lj9+fXs7iv8+vfo3u/den16Pb141fCoAhLADGj6szgCHMAMbvZAAEqOUZwAhmAOOXAZAfl2cAQ5gBjF8GQH5cngEMYQYwfhkA+XF5BjCEGcD4ZQDkx+UZwBBmAOOXAZAfl2cAQ5gBjN9+A9x/eTv6PMDj3Q0dgumbMWqg24dn+vxafCkAhrAAGL+TATIARagWQPhOLcD4nVoAAqwF1AIoQrUAwlcLMHynFqAAawG1AMpQLYDw1QIMXy1A+XUhqEvB3QvgVQT/oAtBAO9faReCEGBnAZ0FUIQ6CyB8hx8IUQXa7p8zfT9dDaafXxdAAcAjUACG39CRAewNJRkgA9g7gpoB7DoG5o8fSs0AeASaAZoBMEJW3lnA8LX0DJABbAljdQbIABShhkDCd/h2Nm6+s4AuBHUhSBcR1TcENgRSgLS4IbAhkDLUEEj4GgIRnz9SpQrUD6D3Qqb3nw1w7QALACZgO8Dt+58BrjzABaAA2AMhyI+fq58eomoBmIDtALfvfy3gygNcAApAM4BkoBYg9P7DlysbAu0A1AKM3/qzmAJQAJoBJAPNAEKvGYCf6UP8/vVw3YHtK2j7/o/PABqg799+6r+g+g8f31H9dHEBwCNQABCglmcAI5gBjN/JAAhQyzOAEcwAxi8DID8uzwCGMAMYvwyA/Lg8AxjCDGD8MgDy4/IMYAgzgPHLAMiPyzOAIcwAxi8DID8uzwCGMAMYv/0GePPn/QsyGC3f/lTwKLxzzqUA2CHQJ4Js615dAJBhAUCAWl4LMIIZwPjxF0Nw81xeABBhLQABanktwAhmAONXC0B+XJ4BDGEGMH4ZAPlxeQYwhBnA+GUA5MflGcAQZgDjlwGQH5dnAEOYAYxfBrj2Fbj987MBtgNAAYy/4kXvRRQATMD2BVAACoA9E7h9BeDxrwUUAPvlTg1gM8DwD1duXwDNALgEC8DTbgXi8W8G2L4CCgB+M6gA7DZgMwAqYPsCKAAFoAtBkoEM0FmA5IdruxDUhSAKEc8Atw/PtAPbX7ZMH/6co284eby7oV0oAITPiwvA8l/c0AgUgAJAGaoFEL754gyQASiFGYDwzRdngAxAKcwAhG++OANkAEphBiB888UZIANQCjMA4ZsvzgAZgFKYAQjffHEGyACUQjXAX0aRxa4uFQQhAAAAAElFTkSuQmCC"
              theme="image"
            />
          </div>
          <div className="value">
            <p className="text-lg">{`${wallet.slice(0, 6)}...${wallet.slice(
              36
            )}`}</p>
            <p className="text-4xl"> {`$${totalValue}`}</p>
          </div>
        </div>
      </div>
    </>
  );
}

PortfolioValue.propTypes = {
  nativeValue: PropTypes.number.isRequired,
  tokens: PropTypes.array.isRequired,
  wallet: PropTypes.string.isRequired,
};

export default PortfolioValue;
