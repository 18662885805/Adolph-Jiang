<template>
	<view>
		<view class="search-container">
			<uniSearchBar
				@confirm="cardSearch" @input="input"
			></uniSearchBar>
		</view>
		<uni-collapse accordion="true" v-model="activeTimes" v-for="(items,index) of cardInfo" :key="index" v-if="cardInfo.length > 0">
			<uni-collapse-item class="collapse-item" showAnimation=true :title='handleCardType(items.card_type)'>
			    <SwitchCard :type="items.card_type" :data="items.number_data"></SwitchCard>
			</uni-collapse-item>
		</uni-collapse>
		<view class="nodata-container" v-if="cardInfo.length === 0">
			<image src="../../static/nodata.png" mode="aspectFit" :style="{height:'300upx'}"></image>
			<text class="nodata-text">无数据</text>
		</view>
	</view>	
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import {carryOutCard} from '../../api/api.js'
	import SwitchCard from './SwitchCard.vue'
	export default {
		data() {
			return {
					activeTimes: [],
					cardInfo:[],
					searchData:''
			}
		},
		onLoad() {
	
		},
		onShow(){
		},
		onReady() {	
			
		},
		onHide(){	
			
		},
		components: {
		    "uni-collapse":uniCollapse,
			"uni-collapse-item":uniCollapseItem,
			SwitchCard,
			uniSearchBar
		},
		methods: {
			input(value){
				console.log('0225',value.value);
				this.cardInfo = [];
				if(value.value){
					this.searchData = value.value
				}
			},
			cardSearch(){
				uni.showLoading({
					title:'搜索中'
				})
			   carryOutCard({pers_no:this.searchData}).then((res)=> {
				 if(res){
					uni.hideLoading();
					this.cardInfo=res.data;
				 }
			   })
			},
			handleCardType(val) {
				let card_type_desc=""
			       switch(val){
			         case 1:card_type_desc='员工卡';
			         break;
			         case 2:card_type_desc='临时卡';
			         break;
			         case 3:card_type_desc='特殊权限卡';
			         break;
			         case 4:card_type_desc='VIP餐卡';
			         break;
			         case 5:card_type_desc='供应商短期出入证';
			         break;
			         case 6:card_type_desc='电脑卡';
			         break;
			         case 7:card_type_desc='设备携出卡';
			         break;
			         case 8:card_type_desc='照相卡';
			         break;
			         case 9:card_type_desc='停车证';
			         break;
			       }
			       return card_type_desc
			}
		}
		
	}
</script>

<style>
	.search-container{
		width: 100%;
	}
	.nodata-container{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 100upx;
	}
	.nodata-text{
		font-size: 40upx;
		color: #808080;
	}
</style>
