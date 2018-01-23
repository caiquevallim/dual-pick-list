/**
 * Created by Caique on 18/01/2018.
 */
var module = angular.module('dual-pick-list',[]);
module.component('dualPickList', {
    controller: [

        function () {


            this.itemsLeft = [];
            this.itemsRight = [];
            this.headerLeft = [];
            this.headerRight = [];

            const dispatchTransaction = ()=>{
                let left = this.itemsLeft.map((i=>{
                    let { left, right, isSelected, ...rest } = i;
                return rest;
            }));

                let right = this.itemsRight.map((i=>{
                    let { left, right, isSelected, ...rest } = i;
                return rest;
            }));

                this.onTransaction({
                    leftList :left,
                    rightList:right
                })
            };

            this.$onChanges = (changeObj)=>{

                if(!changeObj.list)
                    return;
                this.itemsLeft  = [...changeObj.list.currentValue.filter(item=>item.left)];
                this.itemsRight = [...changeObj.list.currentValue.filter(item=>item.right)];

                if(!changeObj.headerConfig)
                    return;

                this.headerLeft = changeObj.headerConfig.currentValue.left;
                this.headerRight = changeObj.headerConfig.currentValue.right;


            };
            this.$onInit = ()=> {

            };
            this.$onDestroy = ()=> {

            };

            this.allToRight = ()=>{
                this.itemsRight = _.concat(this.itemsRight, this.itemsLeft).map(i=>{return{...i, isSelected:false, left:false, right:true}});
                this.itemsLeft = [];
                dispatchTransaction();
            };
            this.allToLeft = ()=>{
                this.itemsLeft = _.concat(this.itemsLeft, this.itemsRight).map(i=>{return{...i, isSelected:false, left:true, right:false}});
                this.itemsRight = [];
                dispatchTransaction();
            };

            this.justSelectedToRight = ()=>{
                this.itemsRight = _.concat(this.itemsRight, this.itemsLeft.filter(i=> i.isSelected)).map(i=>{return{...i, left:false, isSelected:false, right:true}});
                this.itemsLeft  = this.itemsLeft.filter(i=> !i.isSelected).map(i=>{return{...i, left:true, right:false}});
                dispatchTransaction();
            };

            this.justSelectedToLeft = ()=>{
                this.itemsLeft = _.concat(this.itemsLeft, this.itemsRight.filter(i=> i.isSelected)).map(i=>{return{...i, left:true, isSelected:false, right:false}});
                this.itemsRight  = this.itemsRight.filter(i=> !i.isSelected).map(i=>{return{...i, left:true, right:false}});
                dispatchTransaction();
            };

            this.transact = ()=>{
                dispatchTransaction();
            }



        }],
    template:`
    <div class="bootstrap-duallistbox-container">
    <div class="box1 col-md-6" st-table="$ctrl.itemsLeft">
        <label>{{$ctrl.textKeyLeftList?$ctrl.textKeyLeftList: 'Not Selected'}}</label>

        <div class="form-group input-icon-right" style="margin-bottom: 0px">
            <i class="glyphicon glyphicon-search"></i>
            <input type="text"
                   class="form-control"
                   ng-model="filterNotSelected"
                   placeholder="{{$ctrl.placeHolder ? $ctrl.placeHolder :'Search'}}">
        </div>

        <div class="btn-group buttons">
            <button type="button" class="btn moveall btn-default" title="Move all"
                    ng-click="$ctrl.allToRight()"><i
                    class="glyphicon glyphicon-arrow-right"></i> <i
                    class="glyphicon glyphicon-arrow-right"></i></button>
            <button type="button" class="btn move btn-default" style="margin-left: 0" title="Move selected" ng-click="$ctrl.justSelectedToRight()"><i
                    class="glyphicon glyphicon-arrow-right"></i></button>
        </div>

        <div style="overflow: scroll; height: 192px" >
            <table class="table table-striped table-bordered" >
                <thead>
                    <tr>
                        <th ng-repeat="h in $ctrl.headerLeft | filter:{hidden:'!true'} " class="text-left">{{h.text}}</th>
                    </tr>
                </thead>
                <tbody class="text-left">
                    <tr ng-repeat="itemLeft in $ctrl.itemsLeft | filter : filterNotSelected track by $index" st-select-row="itemLeft" st-select-mode="multiple" >
                        <td ng-repeat="l in $ctrl.headerLeft |  filter:{hidden:'!true'} " class="text-left">
                            <span ng-if="!l.custom">{{itemLeft[l.key]}}</span>
                            <select ng-if="l.select"class="form-control" name="{{'selectLeft'+'-'+$index}}" id="selectLeft+'-'+$index" ng-model="itemLeft[l.key]" style="height: inherit;" ng-change="$ctrl.transact()">
                                <option ng-repeat="item in l.select.list" value="{{item.id}}">{{item.text}}</option>
                            </select>
                            <input ng-if="l.checkbox" type="checkbox" ng-model="itemRight[l.key]" ng-click="$ctrl.transact()">
                            <button ng-if="l.button" class="btn btn-default" ng-click="l.button.onClick(itemLeft)">{{l.text}}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="box2 col-md-6" st-table="$ctrl.itemsRight">
        <label>{{$ctrl.textKeyRightList?$ctrl.textKeyRightList: 'Selected'}}</label>

        <div class="form-group input-icon-right" style="margin-bottom: 0px">
            <i class="glyphicon glyphicon-search"></i>
            <input type="text"
                   class="form-control"
                   ng-model="filterSelected"
                   placeholder="{{$ctrl.placeHolder ? $ctrl.placeHolder :'Search'}}">
        </div>

        <div class="btn-group buttons" style="margin-bottom: 0px">
            <button type="button" class="btn remove btn-default" title="Remove selected" ng-click="$ctrl.justSelectedToLeft()"><i
                    class="glyphicon glyphicon-arrow-left"></i></button>
            <button type="button" class="btn removeall btn-default" style="margin-left: 0" title="Remove all"
                    ng-click="$ctrl.allToLeft()"><i
                    class="glyphicon glyphicon-arrow-left"></i> <i
                    class="glyphicon glyphicon-arrow-left"></i></button>
        </div>
        <div style="overflow: scroll; height: 192px" >
            <table class="table table-striped table-bordered" >
                <thead>
                    <tr>
                        <th ng-repeat="h in $ctrl.headerRight |  filter:{hidden:'!true'} " class="text-left">{{h.text}}</th>
                    </tr>
                </thead>
                <tbody class="text-left">
                    <tr ng-repeat="itemRight in $ctrl.itemsRight | filter : filterSelected track by $index" st-select-row="itemRight" st-select-mode="multiple" >
                        <td ng-repeat="r in $ctrl.headerRight |  filter:{hidden:'!true'} " class="text-left">
                            <span ng-if="!r.custom">{{itemRight[r.key]}}</span>
                            <select ng-if="r.select"class="form-control" name="{{'selectRight-'+$index}}" id="selectRight+'-'+$index" ng-model="itemRight[r.key]" style="height: inherit;" ng-change="$ctrl.transact()">
                                <option ng-repeat="item in r.select.list" value="{{item.id}}">{{item.text}}</option>
                            </select>
                            <input ng-if="r.checkbox" type="checkbox" ng-model="itemRight[r.key]" ng-click="$ctrl.transact()">
                            <button ng-if="r.button" type="button" class="btn btn-default" ng-click="r.button.onClick(itemRight)">{{r.text}}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</div>
<style>
    .st-selected{
        background: #216eff !important;
        color: white !important;
    }
</style>
    `,
    controllerAs: '$ctrl',
    bindings: {
        textKeyLeftList:'@?',
        textKeyRightList:'@?',
        list: '<',
        onTransaction:'&',
        headerConfig:'<?',
        placeHolder:'@?'
    }
});
