<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<!-- <el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		  <el-table :data="weeklylists" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="period" label="周刊周期" min-width="60" sortable>
			</el-table-column>
			<el-table-column prop="cover_url" label="周刊封面"min-width="180" >
			</el-table-column>
			<el-table-column prop="title" label="周刊描述">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column> 
		</el-table>  

		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="周刊封面" prop="cover_url">
					<el-input v-model="editForm.cover_url" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="周期" prop="period">
					<el-input v-model="editForm.period" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="周刊描述" prop="title">
					<el-input v-model="editForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="列表">
					<el-button type="primary" class="el-icon-plus" @click="add_edit">添加分类</el-button>
				</el-form-item>
				 <div  v-for="(item,index) in editForm.info">
					<el-form-item label="分类" prop="title">
						 <el-col :span="12">
						     <el-select v-model="item.type_name" placeholder="请选择">
								<el-option
								v-for="item in weeklyClass"
								:key="item.name"
								:label="item.name"
								:value="item.name">
								</el-option>
							</el-select> 
						 </el-col>
						<el-col :span="12">
						    <el-button type="primary" class="el-icon-plus" @click='addArticle_edit(index)'>添加文章</el-button>
						</el-col>
					</el-form-item>
					<div v-for="(data,index) in item.list">
						<el-form-item label="文章标题" prop="title">
							<el-input v-model="data.title" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="文章链接" prop="url">
							<el-input v-model="data.url" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="文章描述" prop="describe">
							<el-input v-model="data.describe" auto-complete="off"></el-input>
						</el-form-item>
					</div>
				</div> 
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="周刊封面" prop="cover_url">
					<el-input v-model="addForm.cover_url" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="周期" prop="period">
					<el-input v-model="addForm.period" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="周刊描述" prop="title">
					<el-input v-model="addForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="列表">
					 <!-- <el-select v-model="addForm.title" placeholder="请选择">
						<el-option
						v-for="item in weeklyClass"
						:key="item.name"
						:label="item.name"
						:value="item.name">
						</el-option>
					</el-select>  -->
					<el-button type="primary" class="el-icon-plus" @click="add">添加分类</el-button>
				</el-form-item>
			    <div  v-for="(item,index) in addForm.info">
					<el-form-item label="分类" prop="title">
						 <el-col :span="12">
						     <el-select v-model="item.type_name" placeholder="请选择">
								<el-option
								v-for="item in weeklyClass"
								:key="item.name"
								:label="item.name"
								:value="item.name">
								</el-option>
							</el-select> 
						 </el-col>
						<el-col :span="12">
						    <el-button type="primary" class="el-icon-plus" @click='addArticle(index)'>添加文章</el-button>
						</el-col>
					</el-form-item>
					<div v-for="(data,index) in item.list">
						<el-form-item label="文章标题" prop="title">
							<el-input v-model="data.title" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="文章链接" prop="url">
							<el-input v-model="data.url" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="文章描述" prop="describe">
							<el-input v-model="data.describe" auto-complete="off"></el-input>
						</el-form-item>
					</div>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import {frontUrl} from '../../config/frontUrl'
	import axios from 'axios'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},			
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				weeklylists:[],
				weeklyClass:[],
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					cover_url: '', // 周刊封面
                    period: '', // 周期
                    title: '',
                     info:[]
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
                  cover_url: '', // 周刊封面
                  period: '', // 周期
                  title: '',
                  info:[]
				}
			}
		},
		methods: {
			//列表
			handleList(){
				let that = this;
				let base = '';
				axios.get(frontUrl+`/api/weeklylist/list`)
					.then(function (res) {
						//this.total = res.data.total;
						that.weeklylists = res.data.result;

						that.listLoading = false;
					})
					.catch(function (error) {
						console.log(JSON.stringify(error));
					});
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					cover_url: '', // 周刊封面
					period:'', // 周期
					title: '',
					info: [
						
					]
				};
			},
			//删除
			handleDel: function (index, row) {
				let that = this;
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { _id: row._id};
					axios.get(frontUrl+'/api/weeklylist/del', {
							params: para
						})
					.then(function (res) {
						that.weeklylists = res.data.result;
						that.listLoading = false;
						that.$message({
							message: '删除成功',
							type: 'success'
						});
						that.handleList();
					})
					.catch(function (error) {
						console.log(JSON.stringify(error));
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				this.editForm.info=JSON.parse(row.info);
			},
			//编辑
			editSubmit: function () {
				let that = this;
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							console.log(para);
							axios.post(frontUrl+'/api/weeklylist/update', {
								params: para,
								withCredentials: true,
								headers: {
									'Content-Type': 'application/json;charset=UTF-8'
								}
							})
							.then(function (res) {
								that.editLoading = false;
								that.$message({
									message: '更新成功',
									type: 'success'
								});
								that.$refs['editForm'].resetFields();
								that.editFormVisible = false;
								that.handleList();
							})
							.catch(function (error) {
								console.log(JSON.stringify(error));
							});
							// editUser(para).then((res) => {
							// 	this.editLoading = false;
							// 	//NProgress.done();
							// 	this.$message({
							// 		message: '提交成功',
							// 		type: 'success'
							// 	});
							// 	this.$refs['editForm'].resetFields();
							// 	this.editFormVisible = false;
							// 	this.getUsers();
							// });
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let that = this;
							let para = Object.assign({}, this.addForm);
							axios.post(frontUrl+'/api/weeklylist/add', {
								params: para,
								withCredentials: true,
								headers: {
									'Content-Type': 'application/json;charset=UTF-8'
								}
							})
								.then(function (res) {
									that.addLoading = false;
									that.weeklyClass = res.data.result;
									that.listLoading = false;
									that.$message({
										message: '提交成功',
										type: 'success'
									});
									that.$refs['addForm'].resetFields();
									that.addFormVisible = false;
									that.handleList();
								})
								.catch(function (error) {
									console.log(JSON.stringify(error));
								});
							// addUser(para).then((res) => {
							// 	this.addLoading = false;
							// 	//NProgress.done();
							// 	this.$message({
							// 		message: '提交成功',
							// 		type: 'success'
							// 	});
							// 	this.$refs['addForm'].resetFields();
							// 	this.addFormVisible = false;
							// 	this.getUsers();
							// });
						});
					}
				});
			},
			//添加大类
			add(){
				this.addForm.info.push({
                    type_name: '',
					type_id:"", 
					list: []
                })
			},
			//添加大类(编辑中)
			add_edit(){
                this.editForm.info.push({
                    type_name: '',
					type_id:"", 
					list: []
                })
			},
			//添加文章
			addArticle(index){
                this.addForm.info[index].list.push({
                    describe: '',
					create_time: '',
					thumburl: '', 
					title: '',
					url: ''
                })
			},
			//添加文章(编辑中)
			addArticle_edit(index){
                this.editForm.info[index].list.push({
                    describe: '',
					create_time: '',
					thumburl: '', 
					title: '',
					url: ''
                })
			},
			//查看分类
			weeklyClassificate() {
				let that = this;
				let base = '';
				axios.get(frontUrl+`/api/weeklyClassificate/list`,{withCredentials: true})
					.then(function (res) {
						that.weeklyClass = res.data.result;
						that.listLoading = false;
					})
					.catch(function (error) {
						console.log(JSON.stringify(error));
					});
			},
			selsChange: function (sels) {
				this.sels = sels;
			}
		},
		mounted() {
			this.handleList();
			this.weeklyClassificate();
		}
	}

</script>

<style scoped>

</style>