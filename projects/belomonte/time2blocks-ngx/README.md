#### Proverbs 10
³ The LORD will not suffer the soul of the righteous to famish: but he casts away the substance of the wicked.
⁴ He becomes poor that deals with a slack hand: but the hand of the diligent makes rich.
⁵ He that gathers in summer is a wise son: but he that sleeps in harvest is a son that causes shame.
⁶ Blessings are on the head of the just: but violence covers the mouth of the wicked. 

# Time2BlocksNgx
Timestamp to bitcoin block

[![npm version](https://badge.fury.io/js/@belomonte%2Ftime2blocks-ngx.svg)](https://github.com/antonioconselheiro/time2blocks-ngx)
[![Npm Total Downloads](https://img.shields.io/npm/dt/@belomonte/time2blocks-ngx.svg)](https://github.com/antonioconselheiro/time2blocks-ngx)
[![Npm Monthly Downloads](https://img.shields.io/npm/dm/@belomonte/time2blocks-ngx.svg)](https://github.com/antonioconselheiro/time2blocks-ngx)

This library contains `@belomonte/time2blocks` functions provided as angular service and as an angular pipe.

## Install
```npm install @belomonte/time2blocks-ngx --save```

## Usage
### Time2BlocksWidgetModule
You can import the widget module to use the pipe, the widget module imports the service module too
```typescript
import { Time2BlocksWidgetModule } from '@belomonte/time2blocks-ngx';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Time2BlocksWidgetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In angular html component:
```html
<span>{{ 1280426887 | time2blocks : 'h [halving], [block] b' | async }}</span>
```

### Time2BlocksServiceModule
You can import only the service module, this will provide Time2BlocksService without the pipe
```typescript
import { Time2BlocksServiceModule } from '@belomonte/time2blocks-ngx';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Time2BlocksServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Service usaged
```typescript
@Directive()
export class AppService implements OnInit {

  consntructor(
    private time2BlocksService: Time2BlocksService
  ) {}

  ngOnInit(): void {
    this.time2BlocksService
      .getFromTimestamp(1695915641)
      .then(block => this.format(block))
      .catch(e => console.error(e));

    this.time2BlocksService
      .getFromTimestamp(1695915641)
      .then(block => console.info(block))
      .catch(e => console.error(e));
  }

  format(block: number): void {
    const formatted = this.time2BlocksService.format(block, '[Halving count down:] -%% [to halving] H');
    console.info('formatted', formatted);
  }
}
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

![formats](https://raw.githubusercontent.com/antonioconselheiro/time2blocks-ngx/master/imgs/time2blocks.png)

## Donate
Help me continue working on tools for the bitcoin and nostr universe, like this one. #zapthedev

There's still a lot of work to do.

Lighting donate: [lightning:peevedbeer57@walletofsatoshi.com](lightning:peevedbeer57@walletofsatoshi.com)

![zap me with lighting network](https://raw.githubusercontent.com/antonioconselheiro/time2blocks/master/imgs/qrcode-wallet-lighting.png)

Bitcoin onchain donate: [bitcoin:bc1qrm99lmmpwk7zsh7njpgthw87yvdm38j2lzpq7q](bitcoin:bc1qrm99lmmpwk7zsh7njpgthw87yvdm38j2lzpq7q)

![on-chain transfer](https://raw.githubusercontent.com/antonioconselheiro/time2blocks/master/imgs/qrcode-wallet-bitcoin.png)

## Build

Run `ng build time2blocks-ngx` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build time2blocks-ngx`, go to the dist folder `cd dist/time2blocks-ngx` and run `npm publish`.

## Running unit tests

Run `ng test time2blocks-ngx` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
