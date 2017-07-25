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
		<el-table :data="weeklyClass" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55">
			</el-table-column> -->
			<el-table-column prop="category_id" label="周刊分类编号" width="160" sortable>
			</el-table-column>
			<el-table-column prop="name" label="周刊分类名称">
			</el-table-column>
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
			<el-form :model="editForm" label-width="180px" :rules="editFormRules" ref="editForm">
				<el-form-item label="周刊分类编号" prop="category_id">
					<el-input v-model="editForm.category_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="周刊分类名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
	
		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="180px" :rules="addFormRules" ref="addForm">
				<el-form-item label="周刊分类编号" prop="category_id">
					<el-input v-model="addForm.category_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="周刊分类名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
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
			weeklyClass: [],
			total: 0,
			page: 1,
			listLoading: false,
			sels: [],//列表选中列
			editFormVisible: false,//编辑界面是否显示
			editLoading: false,
			editFormRules: {
				name: [
					{ required: true, message: '请输入周刊分类名称', trigger: 'blur' }
				]
			},
			//编辑界面数据
			editForm: {
				name: '',
				category_id: 0
			},
			addFormVisible: false,//新增界面是否显示
			addLoading: false,
			addFormRules: {
				category_id: [
					{ required: true, message: '请输入周刊分类编号', trigger: 'blur' }
				],
				name: [
					{ required: true, message: '请输入周刊分类名称', trigger: 'blur' }
				]
			},
			//新增界面数据
			addForm: {
				name: '',
				category_id: ''
			}

		}
	},
	methods: {
		//显示新增界面
		handleAdd: function () {
			this.addFormVisible = true;
			this.addForm = {
				category_id: '',
				name: ''
			};
		},
		//新增分类
		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.addLoading = true;
						//NProgress.start();
						let para = Object.assign({}, this.addForm);
						let that = this;
						let base = '';
						axios.post(frontUrl+'/api/weeklyClassificate/add', {
							params: para,
							withCredentials: true
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
								that.weeklyClassificate();
							})
							.catch(function (error) {
								console.log(JSON.stringify(error));
							});


					});
				}
			});
		},
		//查看分类
		weeklyClassificate() {
			let that = this;
			let base = '';
			axios.get(frontUrl+`/api/weeklyClassificate/list`,{withCredentials: true})
				.then(function (res) {
					//this.total = res.data.total;
					that.weeklyClass = res.data.result;

					that.listLoading = false;
				})
				.catch(function (error) {
					console.log(JSON.stringify(error));
				});
		},
		//删除分类
		handleDel: function (index, row) {
			let that = this;
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				that.listLoading = true;
				//NProgress.start();
				let para = { _id: row._id };
				axios.get(frontUrl+'/api/weeklyClassificate/del', {
							params: para,
							withCredentials: true
						})
				.then(function (res) {
					that.weeklyClass = res.data.result;
					that.listLoading = false;
					that.$message({
						message: '删除成功',
						type: 'success'
					});
					that.weeklyClassificate();
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
						axios.post(frontUrl+'/api/weeklyClassificate/update', {
							params: para,
							withCredentials: true
						})
						.then(function (res) {
							that.editLoading = false;
							that.$message({
								message: '更新成功',
								type: 'success'
							});
							that.$refs['editForm'].resetFields();
							that.editFormVisible = false;
							that.weeklyClassificate();
						})
						.catch(function (error) {
							console.log(JSON.stringify(error));
						});
					});
				}
			});
		},
		selsChange: function (sels) {
			this.sels = sels;
		}
	},
	mounted() {
		this.weeklyClassificate();

	}
}

</script>
<style scoped>

</style>