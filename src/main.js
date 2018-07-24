/**

 (___  ___)   / ___)   /   /  / __  \    / __  \     /   / 
     ) )     / /      / /) ) ( (__)  \  ( (__)  \   / /) ) 
    ( (     ( (      /_/( (   \_____  )  \_____  ) /_/( (  
 __  ) )    ( (          ) )        ) )        ) )     ) ) 
( (_/ /      \ \___     ( (    ____/ /    ____/ /     ( (  
 \___/        \____)    /__\  )_____/    )_____/      /__\


                               ,---.-,      ,---.-,              
                       ,---,  '   ,'  '.   '   ,'  '.      ,---, 
                    ,`--.' | /   /      \ /   /      \  ,`--.' | 
      .--.         /    /  :.   ;  ,/.  :.   ;  ,/.  : /    /  : 
    .--,`|        :    |.' ''   |  | :  ;'   |  | :  ;:    |.' ' 
    |  |.    ,---.`----':  |'   |  ./   :'   |  ./   :`----':  | 
    '--`_   /     \  '   ' ;|   :       ,|   :       ,   '   ' ; 
    ,--,'| /    / '  |   | | \   \      | \   \      |   |   | | 
    |  | '.    ' /   '   : ;  `---`---  ;  `---`---  ;   '   : ; 
    :  | |'   ; :__  |   | '     |   |  |     |   |  |   |   | ' 
  __|  : ''   | '.'| '   : |     '   :  ;     '   :  ;   '   : | 
.'__/\_: ||   :    : ;   |.'     |   |  '     |   |  '   ;   |.' 
|   :    : \   \  /  '---'       ;   |.'      ;   |.'    '---'   
 \   \  /   `----'               '---'        '---'              
  `--`-'                                              

  (_)    /  | |  _  ||  _  |/  | 
   _  ___`| | | |_| || |_| |`| | 
  | |/ __|| | \____ |\____ | | | 
  | | (___| |_.___/ /.___/ /_| |_
  | |\___\___/\____/ \____/ \___/
 _/ |                            
|__/ 

KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
KKKKKKKKKKKKKKKjiKEjitKKKKKKKKKKKKK
KKKKKKKKKKKKKGLKKKKKKKjEKKKKKKKKKKK
KKKKKKKKKKKKttKKKKKKKKKDDKKKKKKKKKK
KKKKKKKKKKtKGKKKKKKKKKKKDGKKKKKKKKK
KKKKKKKKKjKtGKKKKKKKKKKKKLKKKKKKKKK
KKKKKKKKKtKjKKKKKKKKKKKKKKtKKKKKKKK
KKKKKKKKGKtKKKKKKKKKKKKKKKKiKKKKKKK
KKKKKKKKtKtKKKKKKKKKKKKKKKEiKKKKKKK
KKKKKKKKKKtKKKKKKKKKKKKKKKLiKKKKKKK
KKKKKKKKKKtKKKKKKKKKKiiKKKfiKKKKKKK
KKKKKKKKKKtKKKKKKKitKKKKttGjKKKKKKK
KKKKKKKKtftKKKKEiKKKKKKKKKKiKKKKKKK
KKKKKKKKtDtKftiKKKKKKKKKKKKKiKKKKKK
KKKKKKKKttKtKKKKKKKKKKKKKKKKKiKKKKK
KKKKKKKtKDKKGKKKKKKKKKKKGKKKKKiKKKK
KKKKKKKGKKKEGKKKKKKKKEKKjDKKKKKKKKK
KKKKKKKtKKGKKtKGKKKKGiiGEiKtiKiKKKK
KKKKKKKKtKKjKKDiitifiKKKEEtKKKKKKKK
KKKKKKKKLjtDiKKtKKKKEKKiKtKKKKKKKKK
KKKKKKKfKEKKiLKKKKKKKKKfijKKKKKKKKK
KKKKKKtLtKKDKiKKKKKKKKKKKGKKKKKKKKK
KKKKKKLKtKKLKfKKKKKKKKjitKEKKKKKKKK
KKKKKKKKtKKDKKiKKKKKLiKKKKKKKKKKKKK
KKKKKKLKjKKKKELKiKtiKKKKKEKKKKKKKKK
KKKKKKtKjtKKiiKKKKKKKEiKKiKKKKKKKKK
KKKKKKKtKKKKEKKDKKKKijKtDKKKKKKKKKK
KKKKKKKKEttKKLiKKKKEDtKGiKKKKKKKKKK
KKKKKKKKKKtGKKiKKKKfKKiiKKKKKKKKKKK
KKKKKKKKKKKKKKKKKKKKEKKKKKKKKKKKKKK
KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK                          

 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import router from './router'
import App from './App.vue'

Vue.use(ElementUI)

new Vue({el: '#app', store, router, render: h => h(App)})