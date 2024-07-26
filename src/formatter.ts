import { useState, useEffect } from "react";

export const useTokenFormatter = (spec: Promise<string>) => {
  const [formatOptions, setFormatOptions] = useState({
    decimals: 0,
    symbol: null as string | null,
  });

  useEffect(() => {
    let cancelled = false;
    spec.then((specStr) => {
      if (cancelled) return;
      const chainSpec = JSON.parse(specStr);
      const properties = chainSpec.properties;
      if (!properties) return;
      setFormatOptions({
        decimals: properties.tokenDecimals ?? 0,
        symbol: properties.tokenSymbol ?? null,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [spec]);

  return (value: bigint) => {
    // For a quick formatting option, let's use Number.toLocaleString()
    // On prod we'd use something else for better precision with bigints.
    const suffix = formatOptions.symbol ? ` ${formatOptions.symbol}` : "";
    if (!formatOptions.decimals) {
      return Number(value).toLocaleString() + suffix;
    }
    const mod = 10n ** BigInt(formatOptions.decimals);
    const integerPart = value / mod;
    const fractionalPart = value % mod;
    const numericValue =
      Number(integerPart) + Number(fractionalPart) / Number(mod);
    return numericValue.toLocaleString() + suffix;
  };
};
