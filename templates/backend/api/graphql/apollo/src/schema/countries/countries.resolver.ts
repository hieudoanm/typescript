import { CountriesDataSource } from '../../data/countries.data-source';
import { Country } from '../../generated/graphql';

export const resolvers = {
  Query: {
    countries: (
      _parent: unknown,
      _parameters: unknown,
      { countriesDataSource }: { countriesDataSource: CountriesDataSource }
    ): Promise<Country[]> => {
      return countriesDataSource.getCountries();
    },
    country: (
      _parent: unknown,
      { cca3 }: { cca3: string },
      { countriesDataSource }: { countriesDataSource: CountriesDataSource }
    ): Promise<Country | undefined> => {
      return countriesDataSource.getCountry(cca3);
    },
  },
};
