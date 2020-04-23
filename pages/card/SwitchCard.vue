<template>
    <view>
		<!-- 员工卡 -->
        <view v-if="type === 1" class="cu-list menu card-menu margin-top margin-bottom">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">员工号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.pers_no}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">姓名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">公司代码</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.company_code}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">员工组</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.employee_subgroup}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">成本中心</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.cost_center}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">部门</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.department}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">厂区</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.factory}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">直接/间接</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.direct_or_indirect}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">加入时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.entry_date}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">卡号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.edit_number || data.number}}</text>
				</view>
			</view>
		</view>
		<!-- 临时卡 -->
		<view v-if="type === 2" class="cu-list menu card-menu margin-top margin-bottom">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">使用人工号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.public_pers_no}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">使用人姓名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.public_name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">使用人成本中心</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.public_cost_center}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">使用人部门</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.public_department}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">厂区</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.factory}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">部门协调员</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.dept_coordinator}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">是否开通用餐权限</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.eat === 1 ? '是' : '否'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">开始日期</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.start_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">结束日期</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.end_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">理由</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.application_reason}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">卡号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.number}}</text>
				</view>
			</view>
		</view>
		<!-- 特殊权限卡 -->
		<view v-if="type === 3" class="cu-list menu card-menu margin-top margin-bottom">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">使用人工号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.pers_no}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">使用人姓名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">使用人成本中心</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.public_cost_center}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">使用人部门</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.public_department}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">厂区</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.factory}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">开始日期</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.start_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">结束日期</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.end_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">理由</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.application_reason}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="data.source" :style="{display:'flex',flexDirection:'column',alignItems:'flex-start'}">
				<text class="text-grey">附件</text>
				<view v-for="(img,index) in data.source.split(',')" v-bind:key="index">
					<image
						:src=getImageUrl(img)
						mode="aspectFit"
						style="wi"
					></image>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">卡号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.number}}</text>
				</view>
			</view>
		</view>
		<!-- VIP餐卡 -->
		<view v-if="type === 4" class="cu-list menu card-menu margin-top margin-bottom">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">工号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.pers_no}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">姓名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">成本中心</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.public_cost_center}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">部门</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.public_department}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">厂区</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.factory}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">金额</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.money}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">理由</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.application_reason}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">卡号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.number}}</text>
				</view>
			</view>
		</view>
		<!-- 供应商短期出入证 -->
		<view v-if="type === 5" class="cu-list menu card-menu margin-top margin-bottom">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">厂区</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.factory}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">短期识别卡</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.limited_identity_card == 1 ? '白卡' : '芯片卡'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">姓名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.out_name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">身份证</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.id_num}}</text>
				</view>
			</view>			
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">是否需要申请权限</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.need_permission == 1 ? '是' : '否' }}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">供应商/承包商</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.supplier_or_contractor == 1 ? '供应商' : '承包商' }}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">公司全称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.company}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">公司法人代表</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.fictitious_person}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">公司地址</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.address}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">电话</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.out_tel}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">博世公司联络人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.contact_partner}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">分机</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.extension_number}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">工作范围</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.working_range}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">开始时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.start_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">结束时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.end_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">开始工作时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.start_hour}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">结束工作时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.end_hour}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="data.source" :style="{display:'flex',flexDirection:'column',alignItems:'flex-start'}">
				<text class="text-grey">附件</text>
				<view v-for="(img,index) in data.source.split(',')" v-bind:key="index">
					<image
						:src=getImageUrl(img)
						mode="aspectFit"
						style="wi"
					></image>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">卡号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.number}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">工号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.user_num}}</text>
				</view>
			</view>
			
		</view>
		<!-- 电脑卡 -->
		<view v-if="type === 6" class="cu-list menu card-menu margin-top margin-bottom">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">员工号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.pers_no}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">姓名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.name}}</text>
				</view>
			</view>			
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">成本中心</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.cost_center}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">部门</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.department}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">厂区</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.factory}}</text>
				</view>
			</view>
			<view class="cu-item" :style="{display:'flex',flexDirection:'column',alignItems:'flex-start'}" v-if="data.goods">
				<text class="text-grey" :style="{marginTop:'20upx'}">物品信息</text>
				<view v-for="(good,index) in this.renderList(data.goods)" v-bind:key="index" class="good-card">
					<view class="good-card-item">
						<text class="text-grey">固定资产号:</text>
						<text class="good-content">{{good.fixed_asset_number}}</text>
					</view>
					<view class="good-card-item">
						<text class="text-grey">电脑型号:</text>
						<text class="good-content">{{good.model_number}}</text>
					</view>
					<view class="good-card-item">
						<text class="text-grey">序列号:</text>
						<text class="good-content">{{good.serial_number}}</text>
					</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">理由</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.application_reason}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="data.source" :style="{display:'flex',flexDirection:'column',alignItems:'flex-start'}">
				<text class="text-grey">附件</text>
				<view v-for="(img,index) in data.source.split(',')" v-bind:key="index">
					<image
						:src=getImageUrl(img)
						mode="aspectFit"
						style="wi"
					></image>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">卡号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.number}}</text>
				</view>
			</view>
			
		</view>
		<!-- 设备携出卡 -->
		<view v-if="type === 7" class="cu-list menu card-menu margin-top margin-bottom">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">员工号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.pers_no}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">姓名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">成本中心</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.cost_center}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">部门</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.department}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">厂区</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.factory}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">理由</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.application_reason}}</text>
				</view>
			</view>
			<view class="cu-item" :style="{display:'flex',flexDirection:'column',alignItems:'flex-start'}" v-if="data.goods">
				<text class="text-grey" :style="{marginTop:'20upx'}">物品信息</text>
				<view v-for="(good,index) in this.renderList(data.goods)" v-bind:key="index" class="good-card">
					<view class="good-card-item">
						<text class="text-grey">名称:</text>
						<text class="good-content">{{good.name}}</text>
					</view>
					<view class="good-card-item">
						<text class="text-grey">序列号:</text>
						<text class="good-content">{{good.serial_number}}</text>
					</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">卡号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.edit_number || data.number}}</text>
				</view>
			</view>
		</view>
		<!-- 照相卡 -->
		<view v-if="type === 8" class="cu-list menu card-menu margin-top margin-bottom">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">拍摄类型</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.single_or_long === 1 ? '一次性' : '多次'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">开始时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.start_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">结束时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.end_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">拍摄人员</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.execution_by === 1 ? '内部人员' : '外部人员'}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="data.execution_by === 1">
				<view class="content">
					<text class="text-grey">员工号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.pers_no}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="data.execution_by === 1">
				<view class="content">
					<text class="text-grey">姓名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.name}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="data.execution_by === 1">
				<view class="content">
					<text class="text-grey">成本中心</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.cost_center}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="data.execution_by === 1">
				<view class="content">
					<text class="text-grey">部门</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.department}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="data.execution_by === 2">
				<view class="content">
					<text class="text-grey">姓名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.external_name}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="data.execution_by === 2">
				<view class="content">
					<text class="text-grey">工号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.external_id_num}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="data.execution_by === 2">
				<view class="content">
					<text class="text-grey">公司</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.external_company}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="data.execution_by === 2">
				<view class="content">
					<text class="text-grey">部门</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.external_department}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">厂区</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.factory}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">理由</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.application_reason}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">卡号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.edit_number || data.number}}</text>
				</view>
			</view>
		</view>
		<!-- 停车卡 -->
		<view v-if="type === 9" class="cu-list menu card-menu margin-top margin-bottom">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">员工号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.pers_no}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">姓名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.name}}</text>
				</view>
			</view>			
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">成本中心</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.cost_center}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">部门</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.department}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">厂区</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.factory}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">车牌号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.license_plate_no}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">品牌</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.car_type}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">手机</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.phone}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">是否是电动车</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.is_electric ? '是' :'否'}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">开始日期</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.start_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">结束日期</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.end_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">理由</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.application_reason}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">卡号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{data.number}}</text>
				</view>
			</view>
		</view>
    </view>
</template>
<script>
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
export default {
    props: {
        type: {
            type: Number,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    },
    components: {
		'uni-list':uniList,
		'uni-list-item':uniListItem
    },
	methods:{
		getOrNull(val){
			if(val){
				return val
			}else{
				return '-'
			}
		},
		getImageUrl(path) {
		    return "https://wx.mjk24.com/source/" + path;  //123服务器
		},
		renderList(str){
			if(str){
				return eval("("+str+")")
			}else{
				return []
			}
		}
	}
}
</script>
<style>
	.img-card{
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.good-card{
		margin-top: 20upx;
		overflow: hidden;
		width: 100%;
		border-radius: 20upx;
		border: 1px solid #174276;
		padding: 20upx;
	}
	.good-card-item{
		height: 60upx;
		line-height: 60upx;
		width: 100%;
		overflow: hidden;
	}
	.good-content{
		margin-left: 10upx;
	}
	
</style>