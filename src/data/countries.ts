export type PolicyStatus = "Strong" | "Moderate" | "Weak" | "Critical";
export type Trend = "up" | "down";

export type CountryRanking = {
  rank: number;
  flag: string;
  name: string;
  slug: string;
  region: string;
  incomeGroup: string;
  score: number;
  trend: Trend;
  change1Y: number;
  indicators: string;
  policyStatus: PolicyStatus;
};

const baseCountries = [
  // Africa (54)
  ["Algeria", "DZ", "Africa"],
  ["Angola", "AO", "Africa"],
  ["Benin", "BJ", "Africa"],
  ["Botswana", "BW", "Africa"],
  ["Burkina Faso", "BF", "Africa"],
  ["Burundi", "BI", "Africa"],
  ["Cabo Verde", "CV", "Africa"],
  ["Cameroon", "CM", "Africa"],
  ["Central African Republic", "CF", "Africa"],
  ["Chad", "TD", "Africa"],
  ["Comoros", "KM", "Africa"],
  ["Cote d'Ivoire", "CI", "Africa"],
  ["DR Congo", "CD", "Africa"],
  ["Djibouti", "DJ", "Africa"],
  ["Egypt", "EG", "Africa"],
  ["Equatorial Guinea", "GQ", "Africa"],
  ["Eritrea", "ER", "Africa"],
  ["Eswatini", "SZ", "Africa"],
  ["Ethiopia", "ET", "Africa"],
  ["Gabon", "GA", "Africa"],
  ["Gambia", "GM", "Africa"],
  ["Ghana", "GH", "Africa"],
  ["Guinea", "GN", "Africa"],
  ["Guinea-Bissau", "GW", "Africa"],
  ["Kenya", "KE", "Africa"],
  ["Lesotho", "LS", "Africa"],
  ["Liberia", "LR", "Africa"],
  ["Libya", "LY", "Africa"],
  ["Madagascar", "MG", "Africa"],
  ["Malawi", "MW", "Africa"],
  ["Mali", "ML", "Africa"],
  ["Mauritania", "MR", "Africa"],
  ["Mauritius", "MU", "Africa"],
  ["Morocco", "MA", "Africa"],
  ["Mozambique", "MZ", "Africa"],
  ["Namibia", "NA", "Africa"],
  ["Niger", "NE", "Africa"],
  ["Nigeria", "NG", "Africa"],
  ["Republic of the Congo", "CG", "Africa"],
  ["Rwanda", "RW", "Africa"],
  ["Sao Tome and Principe", "ST", "Africa"],
  ["Senegal", "SN", "Africa"],
  ["Seychelles", "SC", "Africa"],
  ["Sierra Leone", "SL", "Africa"],
  ["Somalia", "SO", "Africa"],
  ["South Africa", "ZA", "Africa"],
  ["South Sudan", "SS", "Africa"],
  ["Sudan", "SD", "Africa"],
  ["Tanzania", "TZ", "Africa"],
  ["Togo", "TG", "Africa"],
  ["Tunisia", "TN", "Africa"],
  ["Uganda", "UG", "Africa"],
  ["Zambia", "ZM", "Africa"],
  ["Zimbabwe", "ZW", "Africa"],

  // Asia (49, including Taiwan)
  ["Afghanistan", "AF", "Asia"],
  ["Armenia", "AM", "Asia"],
  ["Azerbaijan", "AZ", "Asia"],
  ["Bahrain", "BH", "Asia"],
  ["Bangladesh", "BD", "Asia"],
  ["Bhutan", "BT", "Asia"],
  ["Brunei", "BN", "Asia"],
  ["Cambodia", "KH", "Asia"],
  ["China", "CN", "Asia"],
  ["Cyprus", "CY", "Asia"],
  ["Georgia", "GE", "Asia"],
  ["India", "IN", "Asia"],
  ["Indonesia", "ID", "Asia"],
  ["Iran", "IR", "Asia"],
  ["Iraq", "IQ", "Asia"],
  ["Israel", "IL", "Asia"],
  ["Japan", "JP", "Asia"],
  ["Jordan", "JO", "Asia"],
  ["Kazakhstan", "KZ", "Asia"],
  ["Kuwait", "KW", "Asia"],
  ["Kyrgyzstan", "KG", "Asia"],
  ["Laos", "LA", "Asia"],
  ["Lebanon", "LB", "Asia"],
  ["Malaysia", "MY", "Asia"],
  ["Maldives", "MV", "Asia"],
  ["Mongolia", "MN", "Asia"],
  ["Myanmar", "MM", "Asia"],
  ["Nepal", "NP", "Asia"],
  ["North Korea", "KP", "Asia"],
  ["Oman", "OM", "Asia"],
  ["Pakistan", "PK", "Asia"],
  ["Palestine", "PS", "Asia"],
  ["Philippines", "PH", "Asia"],
  ["Qatar", "QA", "Asia"],
  ["Saudi Arabia", "SA", "Asia"],
  ["Singapore", "SG", "Asia"],
  ["South Korea", "KR", "Asia"],
  ["Sri Lanka", "LK", "Asia"],
  ["Syria", "SY", "Asia"],
  ["Taiwan", "TW", "Asia"],
  ["Tajikistan", "TJ", "Asia"],
  ["Thailand", "TH", "Asia"],
  ["Timor-Leste", "TL", "Asia"],
  ["Turkey", "TR", "Asia"],
  ["Turkmenistan", "TM", "Asia"],
  ["United Arab Emirates", "AE", "Asia"],
  ["Uzbekistan", "UZ", "Asia"],
  ["Vietnam", "VN", "Asia"],
  ["Yemen", "YE", "Asia"],

  // Europe (44)
  ["Albania", "AL", "Europe"],
  ["Andorra", "AD", "Europe"],
  ["Austria", "AT", "Europe"],
  ["Belarus", "BY", "Europe"],
  ["Belgium", "BE", "Europe"],
  ["Bosnia and Herzegovina", "BA", "Europe"],
  ["Bulgaria", "BG", "Europe"],
  ["Croatia", "HR", "Europe"],
  ["Czechia", "CZ", "Europe"],
  ["Denmark", "DK", "Europe"],
  ["Estonia", "EE", "Europe"],
  ["Finland", "FI", "Europe"],
  ["France", "FR", "Europe"],
  ["Germany", "DE", "Europe"],
  ["Greece", "GR", "Europe"],
  ["Hungary", "HU", "Europe"],
  ["Iceland", "IS", "Europe"],
  ["Ireland", "IE", "Europe"],
  ["Italy", "IT", "Europe"],
  ["Latvia", "LV", "Europe"],
  ["Liechtenstein", "LI", "Europe"],
  ["Lithuania", "LT", "Europe"],
  ["Luxembourg", "LU", "Europe"],
  ["Malta", "MT", "Europe"],
  ["Moldova", "MD", "Europe"],
  ["Monaco", "MC", "Europe"],
  ["Montenegro", "ME", "Europe"],
  ["Netherlands", "NL", "Europe"],
  ["North Macedonia", "MK", "Europe"],
  ["Norway", "NO", "Europe"],
  ["Poland", "PL", "Europe"],
  ["Portugal", "PT", "Europe"],
  ["Romania", "RO", "Europe"],
  ["Russia", "RU", "Europe"],
  ["San Marino", "SM", "Europe"],
  ["Serbia", "RS", "Europe"],
  ["Slovakia", "SK", "Europe"],
  ["Slovenia", "SI", "Europe"],
  ["Spain", "ES", "Europe"],
  ["Sweden", "SE", "Europe"],
  ["Switzerland", "CH", "Europe"],
  ["Ukraine", "UA", "Europe"],
  ["United Kingdom", "GB", "Europe"],
  ["Vatican City", "VA", "Europe"],

  // North America (23)
  ["Antigua and Barbuda", "AG", "North America"],
  ["Bahamas", "BS", "North America"],
  ["Barbados", "BB", "North America"],
  ["Belize", "BZ", "North America"],
  ["Canada", "CA", "North America"],
  ["Costa Rica", "CR", "North America"],
  ["Cuba", "CU", "North America"],
  ["Dominica", "DM", "North America"],
  ["Dominican Republic", "DO", "North America"],
  ["El Salvador", "SV", "North America"],
  ["Grenada", "GD", "North America"],
  ["Guatemala", "GT", "North America"],
  ["Haiti", "HT", "North America"],
  ["Honduras", "HN", "North America"],
  ["Jamaica", "JM", "North America"],
  ["Mexico", "MX", "North America"],
  ["Nicaragua", "NI", "North America"],
  ["Panama", "PA", "North America"],
  ["Saint Kitts and Nevis", "KN", "North America"],
  ["Saint Lucia", "LC", "North America"],
  ["Saint Vincent and the Grenadines", "VC", "North America"],
  ["Trinidad and Tobago", "TT", "North America"],
  ["United States", "US", "North America"],

  // South America (12)
  ["Argentina", "AR", "South America"],
  ["Bolivia", "BO", "South America"],
  ["Brazil", "BR", "South America"],
  ["Chile", "CL", "South America"],
  ["Colombia", "CO", "South America"],
  ["Ecuador", "EC", "South America"],
  ["Guyana", "GY", "South America"],
  ["Paraguay", "PY", "South America"],
  ["Peru", "PE", "South America"],
  ["Suriname", "SR", "South America"],
  ["Uruguay", "UY", "South America"],
  ["Venezuela", "VE", "South America"],

  // Oceania (14)
  ["Australia", "AU", "Oceania"],
  ["Fiji", "FJ", "Oceania"],
  ["Kiribati", "KI", "Oceania"],
  ["Marshall Islands", "MH", "Oceania"],
  ["Micronesia", "FM", "Oceania"],
  ["Nauru", "NR", "Oceania"],
  ["New Zealand", "NZ", "Oceania"],
  ["Palau", "PW", "Oceania"],
  ["Papua New Guinea", "PG", "Oceania"],
  ["Samoa", "WS", "Oceania"],
  ["Solomon Islands", "SB", "Oceania"],
  ["Tonga", "TO", "Oceania"],
  ["Tuvalu", "TV", "Oceania"],
  ["Vanuatu", "VU", "Oceania"],
] as const;

function getFlag(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function hashString(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

function deterministicNumber(seed: string, min: number, max: number) {
  const hash = hashString(seed);
  return min + (hash % (max - min + 1));
}

function deterministicDecimal(seed: string, min: number, max: number) {
  const hash = hashString(seed);
  const value = min + ((hash % 1000) / 1000) * (max - min);
  return +value.toFixed(1);
}

function deterministicTrend(seed: string): Trend {
  return hashString(seed) % 2 === 0 ? "up" : "down";
}

function deterministicPolicy(seed: string): PolicyStatus {
  const options: PolicyStatus[] = ["Strong", "Moderate", "Weak", "Critical"];
  return options[hashString(seed) % options.length];
}

export const countries: CountryRanking[] = baseCountries
  .map(([name, code, region]) => {
    const score = deterministicNumber(name, 20, 90);

    return {
      rank: 0,
      flag: getFlag(code),
      name,
      slug: slugify(name),
      region,
      incomeGroup: "Mixed",
      score,
      trend: deterministicTrend(name),
      change1Y: deterministicDecimal(`${name}-change`, -2.5, 3.5),
      indicators: `${deterministicNumber(`${name}-indicators`, 5, 9)}/9`,
      policyStatus: deterministicPolicy(name),
    };
  })
  .sort((a, b) => b.score - a.score)
  .map((country, index) => ({
    ...country,
    rank: index + 1,
  }));
