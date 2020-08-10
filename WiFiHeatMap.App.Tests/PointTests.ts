import { Test, TestSuite } from "xunit.ts";
import Point from "../WiFiHeatMap.App/Point";

export default class PointTests extends TestSuite
{
    @Test()
    async canCreatePoint(): Promise<void> {
        //arrange
        const x = 12, y = 23;

        //act
        const point = new Point(x, y);

        //assert
        this.assert.equal(12, point.x);
        this.assert.equal(23, point.y);
    } 
}