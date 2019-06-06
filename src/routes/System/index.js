import React from 'react'
import {initSystemInfo} from './action'
import {connect} from 'react-redux'
import { Card, Row, Col,BackTop } from 'antd'
import { Chart, Axis, Geom, Tooltip, Coord, Label, Legend, G2 } from 'bizcharts'
import { View } from '@antv/data-set'
import CustomBreadcrumb from '../../component/CustomBreadcrumb'
import TypingCard from '../../component/TypingCard'
import GaugeColor from '../../component/GaugeColor';

const data3 = [
    {item: '事例一', count: 40},
    {item: '事例二', count: 21},
    {item: '事例三', count: 17},
    {item: '事例四', count: 13},
    {item: '事例五', count: 9}
]
const dv3 = new View()
dv3.source(data3).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
})
const cols3 = {
    percent: {
      formatter: val => {
        val = (val * 100) + '%'
        return val
      }
    }
}

class System extends React.Component {
    componentWillMount(){
        this.props.initSystemInfo('/websystemInfo/getSystemInfo')
    }

    render () {
        const {baseInfo, mem, cpus, disks} = this.props
        const dv4 = new View()
        const dataMem = [{item:"已使用", count:mem.used},{item:'未使用',count:mem.free}]
        dv4.source(dataMem).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        })
        const cols4 = {
            percent: {
              formatter: val => {
                val = Math.trunc(val * 100) + '%'
                return val
              }
            }
        }
        const dv5 = new View()
        const dataSwap = [{item:"已使用", count:mem.swapUsed},{item:'未使用',count:mem.swapFree}]
        dv5.source(dataSwap).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
        })
        const datax = [{value:Math.trunc(cpus.length===0?0:cpus[0].combined)}]
        console.log(datax)
        console.log('--------------------------------------------------------')
        const cardContent = `此页面用到的图表插件是<a href="https://github.com/alibaba/BizCharts">bizcharts@^3.1.10</a>`
        return (
          <div>
            <CustomBreadcrumb arr={['其它', '图表']}/>
            <TypingCard title='图表' source={cardContent}/>
            <Row gutter={10}>
                <Col span={6}>
                    <Card title='操作系统的名称' bordered={false} className='card-item'>
                        {baseInfo.OSname}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title='当前用户' bordered={false} className='card-item'>
                        {baseInfo.userName}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title='操作系统架构' bordered={false} className='card-item'>
                        {baseInfo.OSarch}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title='操作系统的版本' bordered={false} className='card-item'>
                        {baseInfo.OSversion}
                    </Card>
                </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Card title='基础饼图' bordered={false} className='card-item'>
                  <GaugeColor data={datax} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title='基础饼图' bordered={false} className='card-item'>
                    <Chart height={400} data={dv3} scale={cols3} padding={[80, 100, 80, 80]} forceFit>
                        <Coord type='theta' radius={0.75}/>
                        <Axis name="percent"/>
                        {/*<Legend position='right' offsetY={-80} offsetX={-100}/>*/}
                        <Legend position='right' offsetY={-80}/>
                        <Tooltip
                        showTitle={false}
                        itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                        />
                        <Geom
                        type="intervalStack"
                        position="percent"
                        color='item'
                        tooltip={['item*percent', (item, percent) => {
                            percent = percent * 100 + '%'
                            return {
                            name: item,
                            value: percent
                            }
                        }]}
                        style={{lineWidth: 1, stroke: '#fff'}}
                        >
                        <Label content='percent' formatter={(val, item) => {
                            return item.point.item + ': ' + val
                        }}/>
                        </Geom>
                    </Chart>
                </Card>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Card title='内存情况' bordered={false} className='card-item'>
                  <Chart height={400} data={dv4} scale={cols4} padding={[80, 100, 80, 80]} forceFit>
                    <Coord type='theta' radius={0.75}/>
                    <Axis name="percent"/>
                    {/*<Legend position='right' offsetY={-80} offsetX={-100}/>*/}
                    <Legend position='right' offsetY={-80}/>
                    <Tooltip
                      showTitle={false}
                      itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                    />
                    <Geom
                      type="intervalStack"
                      position="percent"
                      color={['item',['red','green']]}
                      tooltip={['item*percent', (item, percent) => {
                        percent = percent * 100 + '%'
                        return {
                          name: item,
                          value: percent
                        }
                      }]}
                      style={{lineWidth: 1, stroke: '#fff'}}
                    >
                      <Label content='percent' formatter={(val, item) => {
                        return item.point.item + ': ' + val
                      }}/>
                    </Geom>
                  </Chart>
                </Card>
              </Col>
              <Col span={12}>
                <Card title='SWAP情况' bordered={false} className='card-item'>
                  <Chart height={400} data={dv5} scale={cols4} padding={[80, 100, 80, 80]} forceFit>
                    <Coord type='theta' radius={0.75}/>
                    <Axis name="percent"/>
                    {/*<Legend position='right' offsetY={-80} offsetX={-100}/>*/}
                    <Legend position='right' offsetY={-80}/>
                    <Tooltip
                      showTitle={false}
                      itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                    />
                    <Geom
                      type="intervalStack"
                      position="percent"
                      color={['item',['red','green']]}
                      tooltip={['item*percent', (item, percent) => {
                        percent = percent * 100 + '%'
                        return {
                          name: item,
                          value: percent
                        }
                      }]}
                      style={{lineWidth: 1, stroke: '#fff'}}
                    >
                      <Label content='percent' formatter={(val, item) => {
                        return item.point.item + ': ' + val
                      }}/>
                    </Geom>
                  </Chart>
                </Card>
              </Col>
            </Row>
            <BackTop visibilityHeight={200} style={{right: 50}}/>
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
    baseInfo: state.system.baseInfo,
    mem: state.system.mem,
    cpus: state.system.cpus,
    disks: state.system.disks,
    success: state.system.success
})

const mapDispatchToProps = (dispatch) => ({
    initSystemInfo: (url) => dispatch(initSystemInfo(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(System)