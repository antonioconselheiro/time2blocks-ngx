#### Proverbs 10
> ³ The LORD will not suffer the soul of the righteous to famish: but he casts away the substance of the wicked.
> ⁴ He becomes poor that deals with a slack hand: but the hand of the diligent makes rich.
> ⁵ He that gathers in summer is a wise son: but he that sleeps in harvest is a son that causes shame.
> ⁶ Blessings are on the head of the just: but violence covers the mouth of the wicked. 

# Time2Blocks
Timestamp to bitcoin block

[![npm version](https://badge.fury.io/js/@belomonte%2Ftime2blocks.svg)](https://github.com/antonioconselheiro/time2blocks)
[![Npm Total Downloads](https://img.shields.io/npm/dt/@belomonte/time2blocks.svg)](https://github.com/antonioconselheiro/time2blocks)
[![Npm Monthly Downloads](https://img.shields.io/npm/dm/@belomonte/time2blocks.svg)](https://github.com/antonioconselheiro/time2blocks)

_____

TypeScript library that identify which time is associated which blockchain block in the past.
The main purpose of the library is to provide a means for nostr clients to enable them to display which block a given message was published to.

## Installation

For full lib (16mb, because include a grande file with a lot of block number and timestamp indexed), you must load the ```history.json``` file to load it, this is how install:

```npm install @belomonte/time2blocks --save```

Light version, without the index file (130kb):

```npm install @belomonte/time2blocks-light --save```

Lib for Angular usage:

```npm install @belomonte/time2blocks-ngx --save```

[I can reference here if you create a wrapper lib for nextjs, vuejs or react.]

## Usage
### Sample code
```typescript
import { time2Blocks } from '@belomonte/time2blocks-light';
async function run() {
  const now = new Date().getTime();
  const block = await time2Blocks.getFromMillisecondsTimestamp(now);
  const sameBlock = await time2Blocks.getFromTimestamp(Math.floor(now / 1000));
  const sameBlockAgain = await time2Blocks.getFromMinutes(Math.floor(now / 60_000));

  const formatted = time2Blocks.format(block, 'H, bb');
  const formatted2 = time2Blocks.format(sameBlock, 'h, B');
  const formatted3 = time2Blocks.format(sameBlockAgain, '-%%% [to next halving]');

  console.info('time as block, formatted: ', formatted);
  console.info('time as block, formatted: ', formatted2);
  console.info('time as block, formatted: ', formatted3);

  return Promise.resolve();
}

run().catch(e => console.error(e))
```

### Load indexed data
```typescript
import { Time2Blocks } from '@belomonte/time2blocks-light';

//  if you include node_modules/@belomonte/time2blocks/history.json as a project asset
fetch('node_modules/@belomonte/time2blocks/history.json')
  .then(dataIndexed => Time2Blocks.getInstance().setIndex(dataIndexed))
```

### Offline mode
In offline mode the lib will not connect to mempool and you'll need to feed the history by yourself

```typescript
import { Time2Blocks } from '@belomonte/time2blocks-light';
const time2blocks = Time2Blocks.getInstance(false);

//  or you can set in the instance
time2blocks.offline();

```

### Formats
h - current halving
H - next halving
-h - last halving
B - all blocks
BB - All blocks in format 0,000,000
b - blocks in this halving
bb - blocks in this halving in format 000,000
-b - blocks to next halving
-bb - blocks to next halving in format 000,000
% - blocks in this halving in percentage: 0.0% ~ 100.0%, 
%% - blocks in this halving in percentage: 0.00% ~ 100.00%, 
%%% - blocks in this halving in percentage: 0.000% ~ 100.000%, 
%%%% - blocks in this halving in raw percentage: 0.x ~ 100.x%, 65.4234234234234%, 21.5%

-% - blocks to next halving in percentage: 0.0% ~ 100.0%, 
-%% - blocks to next halving in percentage: 0.00% ~ 100.00%, 
-%%% - blocks to next halving in percentage: 0.000% ~ 100.000%, 
-%%%% - blocks to next halving in raw percentage: 0.x ~ 100.x%, 65.4234234234234%, 21.5%

So, if your format string include the letter h, b or B you should escape this:
blocksFormat(80000, 'h [Halvings], [block] bb') will return: 3 Halvings, block 170,000
blocksFormat(80000, 'h [[Halvings]], [[block]] bb') will return: 3 Halvings, block 170,000

![formats](https://raw.githubusercontent.com/antonioconselheiro/time2blocks/master/imgs/time2blocks.png)


## Grow NOSTR
To improve the library, it would be good:
 - if a way to search for which blocks were processed around one moment (a timestamp) or more than one moment was available in the mempool api;
 - be possible to include what the block was at the time of publication in NOSTR;

## Donate
Help me continue working on tools for the bitcoin and nostr universe, like this one. #zapthedev

There's still a lot of work to do.

Lighting donate: <a href="lightning:antonioconselheiro@getalby.com">lightning:antonioconselheiro@getalby.com</a>

![zap me](https://raw.githubusercontent.com/antonioconselheiro/antonioconselheiro/main/img/qrcode-wallet-lighting.png)

Bitcoin onchain donate: <a href="bitcoin:bc1qrm99lmmpwk7zsh7njpgthw87yvdm38j2lzpq7q">bc1qrm99lmmpwk7zsh7njpgthw87yvdm38j2lzpq7q</a>

![zap me](https://raw.githubusercontent.com/antonioconselheiro/antonioconselheiro/main/img/qrcode-wallet-bitcoin.png)

## Contribute
[CONTRIBUTE.md](./CONTRIBUTE.md)
