# Global Soil Index API Provider Integration

The frontend currently runs on `MockSoilDataProvider`, which supplies stable
prototype data for the approved visual design and all frontend interactions.
Production soil-health data should be connected through the shared provider
interface in `src/lib/soil-types.ts`.

## Provider Switch

Set these environment variables when a verified API is available:

```bash
NEXT_PUBLIC_GSI_DATA_PROVIDER=api
NEXT_PUBLIC_GSI_API_BASE_URL=https://api.example.org/v1
```

`getSoilDataProvider()` in `src/lib/soil-data.ts` will instantiate
`ApiSoilDataProvider` only when both values are present. Without them, the app
continues to use the mock provider.

## Expected API Surface

The API adapter expects normalized JSON from:

- `GET /metadata`
- `GET /summary`
- `GET /countries`
- `GET /countries/{slug}`
- `GET /indicators`
- `GET /ticker`

Raw API responses should be validated and normalized inside the provider layer.
Page and component code should continue to consume the shared models:

- `Country`
- `CountryRanking`
- `CountryProfile`
- `SoilIndicator`
- `CountryHistory`
- `GlobalSummary`
- `DatasetMetadata`

## Missing Data

Do not fabricate missing measurements in the API adapter. Use `null` for
missing numeric values and set `dataAvailability` / `verificationStatus` so the
UI can display unavailable, limited, or partial states honestly.
