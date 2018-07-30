# express_starters0
для простых экспериментов с Express

`mkdir $(date +%Y%m%d_%H%M%S) && cd $_ && git clone -b env https://github.com/GossJS/express_starters0.git . && yarn`

`atom .`

`yarn prod`

это запускает приложение с переменной окружения NODE_ENV ('env' для app), установленной в production (по умолчанию development).

все пути, кроме содержащих слово stop (которые останавливают приложение), выводят Working.
