import styles from './style.module.scss'

import svg1 from '../../../svg/1.svg'
import svg2 from '../../../svg/2.svg'
import svg3 from '../../../svg/3.svg'
import svg4 from '../../../svg/4.svg'

import { Text } from '../../../ui/text'

import { sortBalance } from './sort'

export const Widget = ({ data, languageSetting }) => {

    const { persent, profit, dur, trades, sucsses } = sortBalance(data)

    const successRate = (sucsses / ( trades / 100)).toFixed(2)

    return (
        <div className={styles.display}>
            <div className={styles.conteiner}>
                <div  className={styles.shadow}/>
                <div className={styles.conteiner_widget}>
                    <img alt="" src={svg1} className={styles.image}/>
                    <div className={styles.content}>
                        <Text size={20} weight={600} roboto>
                            {profit} USDT{" "}<span style={{fontWeight: 400}}>({persent}%)</span>
                        </Text>
                        <Text size={16} roboto>
                            {languageSetting.profit}
                        </Text>
                    </div>
                </div>
                <div className={styles.conteiner_widget}>
                    <img alt="" src={svg2}/>
                    <div className={styles.content} >
                        <Text size={20} weight={600} roboto>
                            {dur}
                        </Text>
                        <Text size={16} roboto>
                            {languageSetting.dur}
                        </Text>
                    </div>
                </div>
            </div>
            <div className={styles.conteiner}>
                <div  className={styles.shadow}/>
                <div className={styles.conteiner_widget}>
                    <img alt="" src={svg3} className={styles.image}/>
                    <div className={styles.content}>
                        <Text size={20} weight={600} roboto>
                            {trades} / {sucsses}
                        </Text>
                        <Text size={16} roboto>
                            {languageSetting.trades}
                        </Text>
                    </div>
                </div>
                <div className={styles.conteiner_widget}>
                    <img alt="" src={svg4} className={styles.image}/>
                    <div className={styles.content}>
                        <Text size={20} weight={600} roboto>
                            {successRate}%
                        </Text>
                        <Text size={16} roboto>
                            {languageSetting.rate}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}