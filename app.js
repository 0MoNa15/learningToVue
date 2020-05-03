Vue.component('CoinDetail', {

  props: ['coin'],

  data(){
    return{
      showPrices: false,
      value: 0
    }
  },

  computed: {
     title(){
      return `${this.coin.name} - ${this.coin.symbol}`
    },

    convertedValue(){
      if(!this.value){
        return 0
      } 
        
      return this.value / this.coin.priceCurrent
    }
  },

  methods:{
    toggleShowPrices(){
      this.showPrices = !this.showPrices

      this.$emit('change-color', 
      this.showPrices ? 'FF96C8' : '3D3D3D')
    }
  },

  template: `

    <div>
      <img 
        v-on:mouseover="toggleShowPrices" 
        v-on:mouseout="toggleShowPrices" 
        v-bind:src="coin.img" 
        v-bind:alt="coin.name" >

      <h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red'">
          {{ title }}
          <span v-if="coin.changePercent > 0"> 👍</span>
          <span v-else-if="coin.changePercent < 0"> 👍</span>
          <span v-else> 👍</span>
          <span v-on:click="toggleShowPrices">
              {{ showPrices ? 'Ocultar' : 'Ver' }}
          </span>
      </h1>

      <input v-model="value">
      <span> {{ convertedValue }} </span>

      <ul v-show="showPrices">
        <li 
            class="uppercase"
            v-bind:class="{
                orange : price.value == coin.priceCurrent,
                red : price.value < coin.priceCurrent,
                green : price.value > coin.priceCurrent
            }"
            v-for="(price, indice) in coin.pricesWithDays" 
            v-bind:key="price.day">

            {{ indice }} - {{ price.day }} - {{ price.value }}

        </li> 
    </ul>

    </div>
  `
})

new Vue({
    el: '#app',

    data(){
        return {
             btc: {
              name: 'Bitcoin',
              symbol: 'BTN',
              img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
              changePercent: -10,
              priceCurrent: 8400,
              pricesWithDays:  [
                  { day: 'Lunes', value: 8400 },
                  { day: 'Martes', value: 7900 },
                  { day: 'Miércoles', value: 8200 },
                  { day: 'Jueves', value: 9000 },
                  { day: 'Viernes', value: 9400 },
                  { day: 'Sábado', value: 10000 },
                  { day: 'Domingo', value: 10200 },
                ],
              },
              color: 'f4f4f4'
        }
    },

    methods: {
      updateColor(color){
        this.color = color || this.color
        .split('')
        .reverse()
        .join('')
      }
    }
})