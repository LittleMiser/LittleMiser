//
//  MUltiPicsModel.m
//  FeedsAPP
//
//  Created by Yueyue on 2019/5/22.
//  Copyright © 2019 iosGroup. All rights reserved.
//

#import "HomeViewModel.h"

@implementation HomeViewModel

//自定义构造方法，必须调用父类的构造方法
-(id) initWithDict:(NSDictionary *)dict
{
    if(self = [super init])
    {
        self.title = dict[@"title"];
        self.imageType = [dict[@"imageType"] intValue];
        self.middleImage = dict[@"middleImage"];
        self.leftImage = dict[@"leftImage"];
        self.rightImage = dict[@"rightImage"];
        self.info = dict[@"info"];
    }
    return self;
}

+(id) newsWithDict:(NSDictionary *)dict
{
    return  [[self alloc] initWithDict:dict];
}

@end
