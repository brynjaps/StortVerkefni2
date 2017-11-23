# StortVerkefni2

## Folder Structure
Við settum scss og javascript skrárnar í sitthvora möppuna, style og js.

## Git Ignore
Við notuðum git-hunsun á þessar helstu hunsanir eins og node_modules og .DS_Store við hunsuðum alla build files og output frá bæði babel og scss.

## Build
Afritum verkefnið frá github og keyrum run build með npm.
```sh
npm run build
```

## Developement
Til að keyra í development mode - live reload og automatic compilation af bæði scss og js, keyrum dev command.
```sh
npm run dev
```

## Myndbond
Til að komast í video partinn þegar indexinn var enn í vinnslu þurftum við að gera run dev og til að skoða video síðuna eftir að localhost síðan byrtist, þá afrituðum við þennan tengil localhost:3000/myndband.html?id=2. Athugið að port númerið gæti breyst.
