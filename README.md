# Persona

Returns a base persona (name, sex & zodiac) for a given ubiq or ethereum address.

As an homage to Satoshi Nakamoto, all names (both given and family) are of a japanese origin.

*Life is for one generation; A good name is forever.*

### Install 

npm:
```
npm install @octano/persona
```

yarn:
```
yarn add @octano/persona
```

### Usage

```javascript
import { getPersona } from '@octano/persona'
const persona = getPersona('0x8429ab69b8721ffb29f2e66fdf06b1c65d66eb58')
console.log(persona)
```

```javascript
{
  success: true,
  sex: 'male',
  name: {
    given: 'Kazufumi',
    family: 'Takeuchi',
  },
  zodiac: 'leo',
  version: 1
}
```

#### Sex

Determined by odd or even state of summed hash: 'male' or 'female'

#### Name

* __given:__ Determined using sex from a total of 512 male and 512 female first names. 
* __family:__ Determined from a total of 4096 last names.

#### Zodiac

one of the following

```
[
  'aquarius',
  'aries',
  'cancer',
  'capricorn',
  'gemini',
  'leo',
  'libra',
  'pisces',
  'sagittarius',
  'scorpio',
  'taurus',
  'virgo',
]
```

#### Error handling

```
import { getPersona } from '@octano/persona'
const persona = getPersona('NOT_A_VALID_ADDRESS')
```

```
{
  success: false,
  error: 'NOT_A_VALID_ADDRESS is not a valid Ubiq/Ethereum address'
}
```

### Usage with NFTs

Persona also supports usage with NFTs

```javascript
import { getPersonaNFT } from '@octano/persona'

const contractAddress = '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'
const chainId = 1
const tokenId = 6529

const persona = getPersonaNFT(contractAddress, tokenId, chainId)
console.log(persona)
```

```javascript
{
  success: true,
  sex: 'female',
  name: {
    given: 'Mieko',
    family: 'Kubota',
  },
  zodiac: 'sagittarius',
  version: 1
}
```

#### Match persona sex with NFT

If your NFT already handles sex you can override Persona to match your NFT.

```javascript
import { getPersonaNFT } from '@octano/persona'

const contractAddress = '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'
const chainId = 1
const tokenId = 6529
const sex = 'male'

const persona = getPersonaNFT(contractAddress, tokenId, chainId, sex)
console.log(persona)
```

```javascript
{
  success: true,
  sex: 'male',
  name: {
    given: 'Kiyoshi',
    family: 'Kubota',
  },
  zodiac: 'sagittarius',
  version: 1
}
```